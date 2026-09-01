import app from './app.js'
import { config } from './config/index.js'
import { prisma } from './lib/prisma.js'

async function main() {
  try {
    await prisma.$connect()
    console.log('[DB] Connected to PostgreSQL')

    app.listen(config.port, () => {
      console.log(`[API] BuildFlow server running on http://localhost:${config.port}`)
      console.log(`[API] Environment: ${config.nodeEnv}`)
      console.log(`[API] Health check: http://localhost:${config.port}/health`)
    })
  } catch (err) {
    console.error('[FATAL] Failed to start server:', err)
    process.exit(1)
  }
}

process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})

main()
