import { describe, it } from 'node:test';
import assert from 'node:assert';
import { deepFreeze } from '../src/index.mjs';

describe('deepFreeze', () => {
	it('should be a function', () => {
		assert.strictEqual(typeof deepFreeze, 'function');
	});
});
