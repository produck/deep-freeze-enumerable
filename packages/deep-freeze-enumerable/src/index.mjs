const visited = new WeakSet();

export function deepFreeze(value) {
	if (value === null || typeof value !== 'object') {
		return value;
	}

	if (visited.has(value)) {
		return value;
	}

	visited.add(value);

	try {
		for (const property in value) {
			try {
				deepFreeze(value[property]);
			} catch {
				// SHH~ skip bad `getter/proxy.~get()`
			}
		}
	} catch {
		// SHH~ skip bad `proxy.~ownKeys()`
	}

	try {
		return Object.freeze(value);
	} catch {
		return value;
	}
}
