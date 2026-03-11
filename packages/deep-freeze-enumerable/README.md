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

`deepFreeze` uses a `const` type parameter (`<const T>`), so TypeScript
infers the narrowest possible type for the argument. This means
`unique symbol` values keep their identity through `DeepReadonly<T>`
without being widened to `symbol`.

```typescript
import { deepFreeze } from '@produck/deep-freeze-enumerable';

declare const TOKEN: unique symbol;

const frozen = deepFreeze({
	token: TOKEN, // unique symbol
});

// frozen.token -> typeof TOKEN  (unique symbol preserved)
```

You can then use the frozen symbol values as precise computed property
keys:

```typescript
const obj = {
	[frozen.token]: 'hello',
};

obj[frozen.token]; // string
```

This also works with deeply nested structures:

```typescript
const GET = Symbol('get');
const SET = Symbol('set');
const EMIT = Symbol('emit');

const METHODS = deepFreeze({
	STORE: {
		GET,  // typeof GET  (unique symbol preserved)
		SET,  // typeof SET  (unique symbol preserved)
	},
	EVENT: {
		EMIT, // typeof EMIT (unique symbol preserved)
	},
});

// METHODS.STORE.GET -> typeof GET
// METHODS.EVENT.EMIT -> typeof EMIT
```

### Symbol literal is not `unique symbol`

TypeScript only types a `Symbol()` call as `unique symbol` when it is
assigned to a `const` variable declaration or a `static readonly` class
property. In all other positions — including object literal property
values — `Symbol()` is inferred as the broad `symbol` type. This is a
TypeScript language limitation, not specific to `deepFreeze`.
`Object.freeze` has the same behavior:

```typescript
// ❌ Symbol() inside an object literal is inferred as `symbol`
const bad = deepFreeze({
	ID: Symbol('id'),   // symbol, not unique symbol
});

// Object.freeze has the same problem:
const bad2 = Object.freeze({
	ID: Symbol('id'),   // symbol, not unique symbol
});
```

To preserve `unique symbol` identity, declare each symbol as a separate
`const` variable first, then reference it in the object:

```typescript
// ✅ Workaround: declare symbols as const variables first
const ID = Symbol('id');
const NAME = Symbol('name');

const good = deepFreeze({
	ID,     // typeof ID   (unique symbol)
	NAME,   // typeof NAME (unique symbol)
});
```

## License

MIT
