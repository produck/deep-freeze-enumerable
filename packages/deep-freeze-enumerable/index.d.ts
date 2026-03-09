/**
 * Recursively freeze enumerable properties of an ECMAScript object.
 * @param object - The object to freeze
 * @returns The frozen object
 */
export function deepFreeze<T>(object: T): Readonly<T>;
