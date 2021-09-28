type ImmutablePrimitive =
  | undefined
  | null
  | boolean
  | string
  | number
  | Function

export type ImmutableMap<K, V> = ReadonlyMap<Immutable<K>, Immutable<V>>
export type ImmutableSet<T> = ReadonlySet<Immutable<T>>
// This works for objects, arrays and tuples:
export type ImmutableObject<T> = { readonly [K in keyof T]: Immutable<T[K]> }
export type Immutable<T> = T extends ImmutablePrimitive
  ? T
  : T extends Map<infer K, infer V>
  ? ImmutableMap<K, V>
  : T extends Set<infer M>
  ? ImmutableSet<M>
  : ImmutableObject<T>

export type Mutable<T> = {
  -readonly [K in keyof T]: T[K] extends Immutable<T[K]> ? Mutable<T[K]> : T[K]
}
