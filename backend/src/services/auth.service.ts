import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { UserRole } from '@prisma/client'
import { prisma } from '../lib/prisma.js'
import { config } from '../config/index.js'
import { ConflictError, NotFoundError, UnauthorizedError } from '../utils/errors.js'
import { AuthUser } from '../middleware/auth.js'
import * as emailService from './email.service.js'

const SALT_ROUNDS = 12

export function signToken(user: AuthUser): string {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn } as jwt.SignOptions,
  )
}

export async function register(data: {
  email: string
  password: string
  name: string
  phone?: string
  role?: UserRole
}) {
  const existing = await prisma.user.findUnique({ where: { email: data.email } })
  if (existing) throw new ConflictError('Email already registered')

  // Only allow HOMEOWNER or CONTRACTOR on public signup
  const role = data.role === UserRole.CONTRACTOR ? UserRole.CONTRACTOR : UserRole.HOMEOWNER

  const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS)
  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash,
      name: data.name,
      phone: data.phone,
      role,
    },
    select: { id: true, email: true, name: true, role: true, phone: true, createdAt: true },
  })

  const token = signToken(user)
  await emailService.sendWelcomeEmail(user.email, user.name).catch(console.error)

  return { user, token }
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw new UnauthorizedError('Invalid email or password')

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) throw new UnauthorizedError('Invalid email or password')

  const authUser: AuthUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
    },
    token: signToken(authUser),
  }
}

export async function getProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      role: true,
      isVerified: true,
      createdAt: true,
      _count: { select: { projects: true } },
    },
  })
  if (!user) throw new NotFoundError('User not found')
  return user
}

export async function updateProfile(
  userId: string,
  data: { name?: string; phone?: string },
) {
  return prisma.user.update({
    where: { id: userId },
    data,
    select: { id: true, email: true, name: true, phone: true, role: true },
  })
}

export async function requestPasswordReset(email: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return // don't reveal if email exists

  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

  await prisma.passwordResetToken.create({
    data: { userId: user.id, token, expiresAt },
  })

  const resetUrl = `${config.frontendUrl}/reset-password?token=${token}`
  await emailService.sendPasswordResetEmail(user.email, user.name, resetUrl).catch(console.error)
}

export async function resetPassword(token: string, newPassword: string) {
  const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } })
  if (!resetToken || resetToken.used || resetToken.expiresAt < new Date()) {
    throw new UnauthorizedError('Invalid or expired reset token')
  }

  const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS)
  await prisma.$transaction([
    prisma.user.update({ where: { id: resetToken.userId }, data: { passwordHash } }),
    prisma.passwordResetToken.update({ where: { id: resetToken.id }, data: { used: true } }),
  ])
}
