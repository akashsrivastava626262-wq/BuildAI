import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  const adminPassword = await bcrypt.hash('Admin@123456', 12)
  const homeownerPassword = await bcrypt.hash('Homeowner@123', 12)
  const contractorPassword = await bcrypt.hash('Contractor@123', 12)

  await prisma.user.upsert({
    where: { email: 'admin@buildflow.ai' },
    update: {},
    create: {
      email: 'admin@buildflow.ai',
      passwordHash: adminPassword,
      name: 'BuildFlow Admin',
      role: UserRole.ADMIN,
      isVerified: true,
    },
  })

  const homeowner = await prisma.user.upsert({
    where: { email: 'homeowner@example.com' },
    update: {},
    create: {
      email: 'homeowner@example.com',
      passwordHash: homeownerPassword,
      name: 'Rajesh Kumar',
      phone: '9876543210',
      role: UserRole.HOMEOWNER,
      isVerified: true,
    },
  })

  await prisma.user.upsert({
    where: { email: 'contractor@example.com' },
    update: {},
    create: {
      email: 'contractor@example.com',
      passwordHash: contractorPassword,
      name: 'Vikram Singh',
      phone: '9123456789',
      role: UserRole.CONTRACTOR,
      isVerified: true,
    },
  })

  const existingProject = await prisma.project.findFirst({
    where: { userId: homeowner.id, title: '3BHK Dream Home' },
  })

  if (!existingProject) {
    const project = await prisma.project.create({
      data: {
        userId: homeowner.id,
        title: '3BHK Dream Home',
        description: 'Modern 3BHK villa with open kitchen and garden',
        projectType: 'RESIDENTIAL',
        plotLength: 12,
        plotWidth: 10,
        city: 'Bangalore',
        address: 'Plot 42, Whitefield',
      },
    })

    await prisma.material.create({
      data: {
        projectId: project.id,
        name: 'Cement (50kg bags)',
        quantity: 96,
        unit: 'bags',
        unitPrice: 380,
        supplier: 'UltraTech',
        category: 'Structure',
      },
    })
  }

  console.log('Seed complete:')
  console.log('  Admin:      admin@buildflow.ai / Admin@123456')
  console.log('  Homeowner:  homeowner@example.com / Homeowner@123')
  console.log('  Contractor: contractor@example.com / Contractor@123')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
