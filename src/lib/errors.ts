import type { FormActionStateError } from '@/lib/forms'
import type { ZodError } from 'zod'

/**
 * Format Zod validation field errors into a more readable format.
 */
export function formatZodValidationError(error: ZodError) {
  return Object.fromEntries(
    Object.entries(error.flatten().fieldErrors).map(([key, value]) => {
      if (Array.isArray(value)) {
        return [key, value.join(', ')]
      }
      return [key, value]
    })
  )
}

export function getInputErrorFromFormState(
  error: FormActionStateError,
  inputKey: string
) {
  if (error && typeof error === 'object') {
    return error[inputKey]
  }

  return undefined
}
