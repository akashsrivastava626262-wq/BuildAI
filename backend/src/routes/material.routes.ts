import { Router, Request, Response, NextFunction } from 'express'
import * as materialService from '../services/material.service.js'
import { authenticate } from '../middleware/auth.js'
import { validateBody, validateParams } from '../middleware/validate.js'
import { createMaterialSchema, idParamSchema } from '../validators/schemas.js'
import { z } from 'zod'

const router = Router({ mergeParams: true })

router.use(authenticate)

const projectIdSchema = z.object({ projectId: z.string().min(1) })

router.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = projectIdSchema.parse(req.params)
      const materials = await materialService.getMaterials(
        projectId,
        req.user!.id,
        req.user!.role,
      )
      res.json({ success: true, data: materials })
    } catch (err) {
      next(err)
    }
  },
)

router.post(
  '/',
  validateBody(createMaterialSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = projectIdSchema.parse(req.params)
      const material = await materialService.addMaterial(
        projectId,
        req.user!.id,
        req.user!.role,
        req.body,
      )
      res.status(201).json({ success: true, data: material })
    } catch (err) {
      next(err)
    }
  },
)

router.patch(
  '/:id',
  validateParams(idParamSchema),
  validateBody(createMaterialSchema.partial()),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const material = await materialService.updateMaterial(
        req.params.id as string,
        req.user!.id,
        req.user!.role,
        req.body,
      )
      res.json({ success: true, data: material })
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
      await materialService.deleteMaterial(req.params.id as string, req.user!.id, req.user!.role)
      res.json({ success: true, message: 'Material deleted' })
    } catch (err) {
      next(err)
    }
  },
)

export default router
