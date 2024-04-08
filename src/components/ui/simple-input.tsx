import type { InputProps } from '@/components/ui/input'
import { Input, InputWrapper } from '@/components/ui/input'
import { InputError } from '@/components/ui/input-error'
import type { FormActionStateError } from '@/lib/forms'
import { cn } from '@/lib/utils'

interface SimpleInputProps extends Omit<InputProps, 'name'> {
  name: string
  label: string
  error?: FormActionStateError | undefined
}

export function SimpleInput({
  label,
  name,
  error,
  disabled,
  ...inputProps
}: SimpleInputProps) {
  return (
    <InputWrapper>
      <label className={cn({ 'opacity-40': disabled })} htmlFor={name}>
        {label}
      </label>
      <Input
        type="text"
        id={name}
        name={name}
        disabled={disabled}
        {...inputProps}
      />
      <InputError error={error} name={name} />
    </InputWrapper>
  )
}
