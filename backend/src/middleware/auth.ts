import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config/index.js'
import { prisma } from '../lib/prisma.js'
import { UnauthorizedError, ForbiddenError } from '../utils/errors.js'
import { Prisma, UserRole } from '@prisma/client'

export interface AuthUser {
  id: string
  email: string
  role: UserRole
  name: string
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser
    }
  }
}

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    next(new UnauthorizedError('Missing or invalid authorization header'))
    return
  }

  const token = header.slice(7)
  try {
    const payload = jwt.verify(token, config.jwt.secret) as AuthUser
    req.user = payload
    next()
  } catch {
    next(new UnauthorizedError('Invalid or expired token'))
  }
}

export function optionalAuth(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    next()
    return
  }
  try {
    const payload = jwt.verify(header.slice(7), config.jwt.secret) as AuthUser
    req.user = payload
  } catch {
    // ignore invalid token for optional auth
  }
  next()
}

export function requireRoles(...roles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new UnauthorizedError())
      return
    }
    if (!roles.includes(req.user.role)) {
      next(new ForbiddenError('Insufficient permissions'))
      return
    }
    next()
  }
}

export async function logAdminAction(
  adminId: string,
  action: string,
  entityType?: string,
  entityId?: string,
  metadata?: Record<string, unknown>,
  ipAddress?: string,
): Promise<void> {
  await prisma.adminLog.create({
    data: {
      adminId,
      action,
      entityType,
      entityId,
      metadata: (metadata ?? undefined) as Prisma.InputJsonValue | undefined,
      ipAddress,
    },
  })
}
