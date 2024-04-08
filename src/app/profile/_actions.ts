'use server'

import { profileInputKey } from '@/app/profile/_constants'
import { formatZodValidationError } from '@/lib/errors'
import { gql } from '@/lib/graphql/__generated__'
import { getClient } from '@/lib/graphql/client'
import { z } from 'zod'

const customerSchema = z.object({
  [profileInputKey.name]: z
    .string()
    .min(3, { message: 'Minimální délka je 3 znaky' }),
  [profileInputKey.email]: z
    .string()
    .email('Email musí být ve správném formátu'),
  [profileInputKey.phone]: z
    .string()
    .min(9, { message: 'Minimální délka je 3 znaky' }), // this should be more complex
})

const MUTATION = gql(/* GraphQL */ `
  mutation UpdateCustomer($id: ID!, $data: CustomerUpdateInput!) {
    updateCustomer(where: { id: $id }, data: $data) {
      id
      name
      email
      phone
    }
  }
`)

export async function updateUserProfile(userId: string, formData: FormData) {
  const parsedData = customerSchema.safeParse(
    Object.fromEntries(formData.entries())
  )

  if (!parsedData.success) {
    return {
      error: formatZodValidationError(parsedData.error),
      success: false,
    }
  }

  const { errors } = await getClient().mutate({
    mutation: MUTATION,
    variables: {
      id: userId,
      data: parsedData.data,
    },
  })

  if (errors && errors.length) {
    return {
      error: 'Něco se pokazilo', // this should be more complex
      success: false,
    }
  }

  return {
    success: true,
  }
}
