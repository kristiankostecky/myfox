import { updateUserProfile } from '@/app/profile/_actions'
import { UserProfileForm } from '@/app/profile/_components/form'
import { CUSTOMER_ID } from '@/config/constants'
import { gql } from '@/lib/graphql/__generated__'
import { getClient } from '@/lib/graphql/client'
import { InfoIcon } from 'lucide-react'
import { notFound } from 'next/navigation'

const QUERY = gql(/* GraphQL */ `
  query UserPage($id: ID!) {
    customer(where: { id: $id }) {
      id
      name
      email
      phone
    }
  }
`)

export default async function Page() {
  const { data } = await getClient().query({
    query: QUERY,
    variables: { id: CUSTOMER_ID },
  })

  const customer = data.customer

  if (!customer) {
    return notFound()
  }

  return (
    <main className="flex grow flex-col">
      <div className="container flex max-w-lg flex-col items-center gap-2.5 py-6">
        <h1 className="text-2xl font-semibold">Osobni udaje</h1>
        <div className="flex gap-3 rounded-md bg-green-100 p-2.5">
          <div>
            <InfoIcon size={24} />
          </div>
          <p>Údaje se použijí v příštích rezervacích, které se tím zrychlí.</p>
        </div>
        <UserProfileForm
          data={data}
          onSubmit={updateUserProfile.bind(null, customer.id)}
        />
      </div>
    </main>
  )
}
