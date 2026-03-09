import { describe, it } from 'node:test';
import assert from 'node:assert';
import { deepFreeze } from '../src/index.mjs';

describe('deepFreeze', () => {
	it('should be a function', () => {
		assert.strictEqual(typeof deepFreeze, 'function');
	});

	it('should recursively freeze enumerable properties', () => {
		const object = {
			a: { b: 1 },
			c: [1, { d: 2 }],
		};

		const frozen = deepFreeze(object);

		assert.strictEqual(frozen, object);
		assert.strictEqual(Object.isFrozen(object), true);
		assert.strictEqual(Object.isFrozen(object.a), true);
		assert.strictEqual(Object.isFrozen(object.c), true);
		assert.strictEqual(Object.isFrozen(object.c[1]), true);
	});

	it('should only recurse into own enumerable properties', () => {
		const hidden = { x: 1 };
		const object = {
			visible: { y: 2 },
		};

		Object.defineProperty(object, 'hidden', {
			value: hidden,
			enumerable: false,
		});

		deepFreeze(object);

		assert.strictEqual(Object.isFrozen(object.visible), true);
		assert.strictEqual(Object.isFrozen(hidden), false);
	});

	it('should ignore symbol-key properties when recursing', () => {
		const symbolKey = Symbol('symbol-key');
		const value = { a: 1 };
		const object = {
			[symbolKey]: value,
		};

		deepFreeze(object);

		assert.strictEqual(Object.isFrozen(object), true);
		assert.strictEqual(Object.isFrozen(value), false);
	});

	it('should not freeze function-valued properties', () => {
		const method = function method() {
			return 1;
		};
		const object = { method };

		deepFreeze(object);

		assert.strictEqual(Object.isFrozen(object), true);
		assert.strictEqual(Object.isFrozen(method), false);
	});

	it('should handle cyclic references', () => {
		const object = { a: 1 };
		object.self = object;

		assert.doesNotThrow(() => deepFreeze(object));
		assert.strictEqual(Object.isFrozen(object), true);
	});

	it('should return input as-is when input is not an object', () => {
		assert.strictEqual(deepFreeze(null), null);
		assert.strictEqual(deepFreeze(1), 1);
		assert.strictEqual(deepFreeze('x'), 'x');
	});

	it('should not throw when enumerable getter throws', () => {
		const object = {};
		Object.defineProperty(object, 'broken', {
			enumerable: true,
			get() {
				throw new Error('boom');
			},
		});

		assert.doesNotThrow(() => deepFreeze(object));
	});

	it('should not throw when proxy traps throw', () => {
		const proxy = new Proxy({}, {
			ownKeys() {
				throw new Error('trap');
			},
		});

		assert.doesNotThrow(() => deepFreeze(proxy));
	});
});
