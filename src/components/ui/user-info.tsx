import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { gql } from '@/lib/graphql/__generated__'
import { getClient } from '@/lib/graphql/client'

const QUERY = gql(/* GraphQL */ `
  query UserInfo($id: ID!) {
    customer(where: { id: $id }) {
      id
      name
      email
      picture {
        url
      }
    }
  }
`)

export async function UserInfo({ id }: { id: string }) {
  const { data } = await getClient().query({
    query: QUERY,
    variables: { id: id },
  })

  const customer = data.customer

  if (!customer) {
    // handle no data based on ui/ux
    return null
  }

  return (
    <div className="flex gap-3">
      <Avatar>
        <AvatarImage
          src={customer.picture?.url}
          alt={customer.name ?? undefined}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <div>{customer.name}</div>
        <div>{customer.email}</div>
      </div>
    </div>
  )
}
