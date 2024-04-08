/**
 * This is a hack to make sure that when used in union with template literals it will
 * autocomplete the string literal type
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type StringType = string & {}

/**
 * Get intersection type given union type `U`
 * @example
 * // Expect: { name: string } & { age: number } & { visible: boolean }
 * UnionToIntersection<{ name: string } | { age: number } | { visible: boolean }>
 */
export type UnionToIntersection<U> = (
  U extends unknown ? (x: U) => void : never
) extends (x: infer I) => void
  ? I
  : never

/**
 * Replace all occurrences of `TToReplace` with `TReplacement` in `TString`
 */
export type Replace<
  TString extends string,
  TToReplace extends string,
  TReplacement extends string,
> = TString extends `${infer TPrefix}${TToReplace}${infer TSuffix}`
  ? `${TPrefix}${TReplacement}${TSuffix}`
  : never

/**
 * Get values of an object
 */
export type ValueOf<T> = T[keyof T]

/**
 * Only alow extracting types that are present in union `T`.
 * Compared to `Extract`, `StrictExtract` does not allow extracting types that are not present in `T`.
 * @example
 * Correct usage `StrictExtract<'a' | 'b' , 'a'> => 'a' | 'b'`
 * Errors out `StrictExtract<'a' | 'b' , 'c'> => never`
 */
export type StrictExtract<T, U extends Partial<T>> = T extends U ? T : never

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FORCE_ANY = any

export type NextPageSearchParams = {
  [key: string]: string | Array<string> | undefined
}
