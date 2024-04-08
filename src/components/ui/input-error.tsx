import { getInputErrorFromFormState } from '@/lib/errors'
import type { FormActionStateError } from '@/lib/forms'
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

export interface InputErrorProps<TErrorKey extends string = string>
  extends HTMLAttributes<HTMLParagraphElement> {
  error: FormActionStateError<TErrorKey> | undefined
  name: TErrorKey
}

export function InputError<TErrorKey extends string = string>({
  error,
  name,
  className,
  ...props
}: InputErrorProps<TErrorKey>) {
  if (!error) {
    return null
  }
  return (
    <p className={cn('text-sm text-red-500', className)} {...props}>
      {getInputErrorFromFormState(error, name)}
    </p>
  )
}
