import type { ValueOf } from '@/lib/types'

export const routes = {
  home: '/',
  reservations: '/reservations',
  profile: '/profile',
  changePassword: '/change-password',
} as const

export type Route = ValueOf<typeof routes>

/**
 * Keys of the parameters of the routes that are functions.
 */
export type RoutesParamsKeys = keyof {
  [K in Route as K extends (...args: infer TParams) => unknown
    ? keyof TParams[0]
    : never]: never
}
