import {
	deepReadonlyUniqueSymbols,
	type DeepReadonlyPathSlot,
	type DeepReadonlySlot,
	type DeepReadonlySlotToKey,
} from './slots';

type DeepReadonlyUniqueSymbolFromPath<Path extends readonly PropertyKey[]> =
	[DeepReadonlyPathSlot<Path>] extends [never]
		? symbol
		: (typeof deepReadonlyUniqueSymbols)[DeepReadonlySlotToKey[DeepReadonlyPathSlot<Path> & DeepReadonlySlot]];

type DeepReadonlyInner<
	T,
	Path extends readonly PropertyKey[],
> = T extends (...args: unknown[]) => unknown
	? T
	: T extends symbol
		? symbol extends T
			? DeepReadonlyUniqueSymbolFromPath<Path>
			: T
	: T extends readonly (infer U)[]
		? ReadonlyArray<DeepReadonlyInner<U, [...Path, number]>>
		: T extends object
			? { readonly [K in keyof T]: DeepReadonlyInner<T[K], [...Path, K]> }
			: T;

export type DeepReadonly<T> = DeepReadonlyInner<T, []>;

/**
 * Recursively freeze enumerable properties of an ECMAScript object.
 * @param object - The object to freeze
 * @returns The frozen object
 */
export function deepFreeze<T>(object: T): DeepReadonly<T>;
