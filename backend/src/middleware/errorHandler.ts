import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { AppError } from '../utils/errors.js'
import { MissingInputsError } from '../utils/missingInputs.js'
import { config } from '../config/index.js'

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
      },
    })
    return
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: err.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      },
    })
    return
  }

  if (err instanceof MissingInputsError) {
    res.status(422).json({
      success: false,
      error: {
        code: 'MISSING_INPUTS',
        message: err.message,
        missingFields: err.missingFields,
      },
    })
    return
  }

  console.error('[ERROR]', err)

  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message:
        config.nodeEnv === 'production'
          ? 'An unexpected error occurred'
          : err.message,
    },
  })
}

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Endpoint not found',
    },
  })
}
