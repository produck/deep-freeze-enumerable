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

### `deepFreeze<T>(object: T): Readonly<T>`

Recursively freezes the enumerable properties of the given object.

**Parameters:**

- `object` - Any ECMAScript object to freeze

**Returns:**

- The frozen object

## License

MIT
