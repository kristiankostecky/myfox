import type { routes } from '@/config/routes'
import { useMatchPath } from '@/lib/hooks/use-match-path'
import type { ValueOf } from '@/lib/types'

// use this once there are dynamic routes
// const appRoutesParams = {} as const satisfies Record<RoutesParamsKeys, string>

export function useMatchAppRoutes(
  appRoute: Array<ValueOf<typeof routes>>,
  matchSubRoutes = false
) {
  const pattern = appRoute
    .map((route) => {
      if (typeof route === 'string') {
        return `${route}${matchSubRoutes ? '/[[...rest]]' : ''}`
      }

      throw new Error('Unknown route type')
      // use this once there are dynamic routes
      // if (typeof route === 'function') {
      //   return `${route(appRoutesParams)}${matchSubRoutes ? '/[[...rest]]' : ''}`
      // }
    })
    .join('|')

  return useMatchPath(pattern)
}
