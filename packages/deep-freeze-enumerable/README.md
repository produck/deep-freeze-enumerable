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

## License

MIT
