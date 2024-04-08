import type { FORCE_ANY } from '@/lib/types'
import { useQueryStates } from 'nuqs'

const anyParser = {
  parse: (v: string) => JSON.parse(v),
  serialize: (v: FORCE_ANY) => JSON.stringify(v),
}

export function useClearQueryStates(keys: Array<string>) {
  const [_, setQueryStates] = useQueryStates(
    Object.fromEntries(keys.map((key) => [key, anyParser]))
  )

  return () => {
    setQueryStates(Object.fromEntries(keys.map((key) => [key, null])))
  }
}
