declare const __deepReadonlyUniqueSymbolBrand: unique symbol;

type DeepReadonlyUniqueSymbol = symbol & {
	readonly [__deepReadonlyUniqueSymbolBrand]: true;
};

export type DeepReadonly<T> = T extends (...args: unknown[]) => unknown
	? T
	: T extends symbol
		? symbol extends T
			? DeepReadonlyUniqueSymbol
			: T
	: T extends readonly (infer U)[]
		? ReadonlyArray<DeepReadonly<U>>
		: T extends object
			? { readonly [K in keyof T]: DeepReadonly<T[K]> }
			: T;

/**
 * Recursively freeze enumerable properties of an ECMAScript object.
 * @param object - The object to freeze
 * @returns The frozen object
 */
export function deepFreeze<T>(object: T): DeepReadonly<T>;
