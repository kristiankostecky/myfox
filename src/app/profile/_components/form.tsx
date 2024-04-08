'use client'

import { profileInputKey } from '@/app/profile/_constants'
import { Button } from '@/components/ui/button'
import { SimpleInput } from '@/components/ui/simple-input'
import { routes } from '@/config/routes'
import type { FormActionState } from '@/lib/forms'
import type { UserPageQuery } from '@/lib/graphql/__generated__/graphql'
import Link from 'next/link'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'

interface UserProfileFormProps {
  data: UserPageQuery
  onSubmit: (formData: FormData) => Promise<FormActionState>
}

export function UserProfileForm({ data, onSubmit }: UserProfileFormProps) {
  const [updateProfileState, updateProfileAction] = useFormState<
    FormActionState,
    FormData
  >(async (_prev, formData) => {
    const result = await onSubmit(formData)

    if (result?.error && typeof result.error === 'string') {
      toast.error(result.error)
    }

    if (result?.error) {
      return { error: result.error }
    }

    return { success: true }
  }, null)

  const customer = data.customer

  if (!customer) {
    return null
  }

  return (
    <form action={updateProfileAction} className="w-full">
      <SimpleInput
        name={profileInputKey.name}
        label="Jméno"
        placeholder="Jméno"
        defaultValue={customer.name ?? undefined}
        error={updateProfileState?.error}
      />
      <SimpleInput
        name={profileInputKey.email}
        label="Email"
        placeholder="Email"
        defaultValue={customer.email ?? undefined}
        error={updateProfileState?.error}
      />
      <SimpleInput
        name={profileInputKey.phone}
        label="Telefon"
        placeholder="Telefon"
        defaultValue={customer.phone ?? undefined}
        error={updateProfileState?.error}
      />
      <div className="flex flex-col items-center justify-center gap-2 pt-12">
        <Button className="w-full max-w-lg" type="submit">
          Uložit
        </Button>
        <Link href={routes.changePassword}>Změnit heslo</Link>
      </div>
    </form>
  )
}
