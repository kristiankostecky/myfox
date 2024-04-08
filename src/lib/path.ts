import type { Replace } from '@/lib/types'

type ExtractRouteParams<T extends string> = string extends T
  ? Record<string, string>
  : T extends `${string}:${infer Param}/${infer Rest}`
    ? { [k in Param | keyof ExtractRouteParams<Rest>]: string }
    : T extends `${string}:${infer Param}`
      ? { [k in Param]: string }
      : object

type ResultPath<T extends string> = Replace<T, `:`, ''>

export function generatePath<S extends string>(
  path: S,
  params: ExtractRouteParams<S>
) {
  return path.replace(/:\w+/g, (match) => {
    const paramName = match.slice(1)
    return params[paramName as keyof typeof params] as string
  }) as ResultPath<S>
}

function removeTrailingSlash(val: string) {
  return val.endsWith('/') ? val.substring(0, val.length - 1) : val
}

/**
 * Check if the current pathname matches the pattern.
 * @example will match
 * ['/cake', '/cake'],
 * ['/cake', '/cake/'],
 * ['/cake', '/cake?frige=warm'],
 * ['/cake', '/cake?frige=warm&freezer=cold'],
 * ['/[id]', '/cake'],
 * ['/[anything-goes]', '/cake'],
 * ['/c/[id]/practitioner/[pid]/[anything-goes]', '/c/1/practitioner/2/3'],
 * ['/[...rest]', '/cake'],
 * ['/[...rest]', '/cake/fake/snake?shake=true'],
 * ['/shop/[[...rest]]', '/shop'],
 * ['/shop/[[...rest]]', '/shop/'],
 * ['/shop/[[...rest]]', '/shop/snake'],
 * ['/[...rest]/fake/snake', '/cake/fake/snake?shake=true'],
 * ['/welcome', '/welcome/?verifier=z3vvsSm'],
 * @example will NOT match
 * ['/stake', '/snake'],
 * ['/cake', '/cake/subpath-not-ok'],
 * ['/cake/[oh-whats-this]', '/cake/'],
 * ['/[...rest]/nope/snake', '/cake/fake/snake?shake=true'],
 * ['/[...rest]', '/'],
 */
export function matchPath(pathname: string, pattern: string | null) {
  if (!pattern) {
    return false
  }
  if (pathname === pattern) {
    return true
  }
  const basePath = removeTrailingSlash(pathname.split('?')[0] as string)
  const basePattern = removeTrailingSlash(pattern.split('?')[0] as string)
  if (basePath === basePattern) {
    return true
  }
  const basePathPatternRegex = new RegExp(
    `^${basePattern.replace(/(\[[a-zA-Z0-9-]+\])+/g, '[a-zA-Z0-9-]+')}$`
      .replace(/\[\[\.\.\.[a-zA-Z0-9-]+\]\]/g, '?.*')
      .replace(/\[\.\.\.[a-zA-Z0-9-]+\]/g, '.*')
  )
  if (basePathPatternRegex.test(basePath)) {
    return true
  }
  return false
}
