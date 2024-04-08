export type FormActionStateError<K extends string = string> =
  | Partial<Record<K, string>>
  | string

export type FormActionState<K extends string = string> = {
  error?: FormActionStateError<K>
  success?: boolean
} | null

export function stringifyFormError(error: FormActionStateError) {
  if (typeof error === 'string') {
    return error
  }

  return Object.values(error).join(', ')
}
