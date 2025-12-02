/**
 * Shared utilities for transforming backend IDs to frontend IDs
 * 
 * Backend uses MongoDB which returns _id, but frontend expects id.
 * This utility provides consistent transformation functions.
 */

/**
 * Transform _id to id
 * Handles both _id and id fields, preferring _id if present
 * 
 * @param obj - Object with _id or id field
 * @returns The id value (from _id or id field)
 */
export function transformId<T extends { _id?: string | { toString(): string }; id?: string }>(
  obj: T
): string {
  if (obj._id) {
    return typeof obj._id === 'string' ? obj._id : obj._id.toString()
  }
  if (obj.id) {
    return obj.id
  }
  return ''
}

/**
 * Transform an object with _id to an object with id
 * 
 * @param obj - Object with _id field
 * @returns Object with id field (removed _id)
 */
export function transformObjectId<T extends { _id?: string | { toString(): string }; id?: string }>(
  obj: T
): Omit<T, '_id'> & { id: string } {
  const { _id, ...rest } = obj as T & { _id?: string | { toString(): string } }
  return {
    ...rest,
    id: transformId(obj),
  } as Omit<T, '_id'> & { id: string }
}

/**
 * Transform an array of objects with _id to objects with id
 * 
 * @param arr - Array of objects with _id field
 * @returns Array of objects with id field
 */
export function transformArrayIds<T extends { _id?: string | { toString(): string }; id?: string }>(
  arr: T[]
): Array<Omit<T, '_id'> & { id: string }> {
  return arr.map(transformObjectId)
}

