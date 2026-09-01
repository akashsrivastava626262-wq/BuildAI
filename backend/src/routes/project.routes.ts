import { Router, Request, Response, NextFunction } from 'express'
import { UserRole } from '@prisma/client'
import * as projectService from '../services/project.service.js'
import { authenticate, requireRoles } from '../middleware/auth.js'
import { validateBody, validateParams } from '../middleware/validate.js'
import {
  createProjectSchema,
  updateProjectSchema,
  idParamSchema,
} from '../validators/schemas.js'

const router = Router()

router.use(authenticate)

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await projectService.getProjects(req.user!.id, req.user!.role)
    res.json({ success: true, data: projects })
  } catch (err) {
    next(err)
  }
})

router.post(
  '/',
  validateBody(createProjectSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await projectService.createProject(req.user!.id, req.body)
      res.status(201).json({ success: true, data: project })
    } catch (err) {
      next(err)
    }
  },
)

router.get(
  '/:id',
  validateParams(idParamSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await projectService.getProjectById(
        req.params.id as string,
        req.user!.id,
        req.user!.role,
      )
      res.json({ success: true, data: project })
    } catch (err) {
      next(err)
    }
  },
)

router.patch(
  '/:id',
  validateParams(idParamSchema),
  validateBody(updateProjectSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await projectService.updateProject(
        req.params.id as string,
        req.user!.id,
        req.user!.role,
        req.body,
      )
      res.json({ success: true, data: project })
    } catch (err) {
      next(err)
    }
  },
)

router.delete(
  '/:id',
  validateParams(idParamSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await projectService.deleteProject(req.params.id as string, req.user!.id, req.user!.role)
      res.json({ success: true, message: 'Project deleted' })
    } catch (err) {
      next(err)
    }
  },
)

router.post(
  '/:id/generate-ai',
  validateParams(idParamSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await projectService.runAIGeneration(
        req.params.id as string,
        req.user!.id,
        req.user!.role,
      )
      res.json({ success: true, data: project })
    } catch (err) {
      next(err)
    }
  },
)

export default router
