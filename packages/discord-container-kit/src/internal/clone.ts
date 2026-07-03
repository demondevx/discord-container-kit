/**
 * Recursively deep clones an object or array.
 * This is used to ensure builders return unlinked instances when cloned,
 * and to prevent mutation of the returned payload from `toJSON()`.
 *
 * It is a lightweight clone suitable for the plain data objects we store.
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepClone) as unknown as T;
  }

  const copy: Record<string, unknown> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepClone((obj as Record<string, unknown>)[key]);
    }
  }
  return copy as T;
}
