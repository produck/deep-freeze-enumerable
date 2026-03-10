# @produck/deep-freeze-enumerable

Recursively freeze enumerable properties of ECMAScript objects.

## Installation

```bash
npm install @produck/deep-freeze-enumerable
```

## Usage

### `deepFreeze(object)`

Recursively freeze enumerable properties of an object.

```javascript
import { deepFreeze } from '@produck/deep-freeze-enumerable';

const obj = { a: 1, b: { c: 2 } };

deepFreeze(obj);
```

## API

### `deepFreeze<T>(object: T): DeepReadonly<T>`

Recursively freezes the enumerable properties of the given object.

**Parameters:**

- `object` - Any ECMAScript object to freeze

**Returns:**

- The same object instance, typed as recursively `readonly`

## Silent Handling Cases

`deepFreeze` is intentionally defensive and will not throw in several
edge cases.

1. Enumerable property access throws
When reading `value[property]` during recursion, a getter (or proxy
`get` trap) may throw.
Behavior: that property is skipped and recursion continues with other
properties.

2. Property enumeration throws
The `for...in` loop may fail (for example, a proxy `ownKeys` trap
throws).
Behavior: recursion is skipped for that object, then
`Object.freeze(value)` is still attempted.

3. `Object.freeze` itself throws
In rare cases, `Object.freeze(value)` can throw (for example, proxy
trap failures).
Behavior: the original value is returned as-is, possibly not frozen.

4. Non-object values and function-valued properties
`null`, primitives, and functions are not recursively frozen by this
implementation.
Behavior: they are returned unchanged.

## TypeScript Type Notes

### Symbol-valued properties

When `DeepReadonly<T>` recurses into a property whose value type is
`symbol`, it is treated as a unique-symbol-like readonly symbol type.

- A broad `symbol` value is converted to a branded symbol type.
- An already narrow `unique symbol` value keeps its original type.

```typescript
import { deepFreeze } from '@produck/deep-freeze-enumerable';

declare const TOKEN: unique symbol;

const value = {
	id: Symbol('id'), // symbol
	token: TOKEN, // unique symbol
};

const frozen = deepFreeze(value);
// frozen.id    -> readonly unique-symbol-like symbol type
// frozen.token -> readonly typeof TOKEN
```

### Limitation with computed property keys

Even when symbol-valued properties are distinguished by `DeepReadonly`,
TypeScript may still widen computed object keys to a generic symbol index
in object literals.

This means code like `{ [frozen.a]: x, [frozen.c.b]: y }` can be inferred
as `Record<symbol, ...>`, and `obj[frozen.c.b]` may become a union of all
symbol-keyed values.

If you need precise key-to-value inference for computed symbol keys, use
real `const` unique symbol keys (for example `const K = Symbol('k')`) at
object construction time.

## License

MIT
