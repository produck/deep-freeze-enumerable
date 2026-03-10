export declare const deepReadonlyUniqueSymbols: {
	readonly s00: unique symbol; readonly s01: unique symbol;
	readonly s02: unique symbol; readonly s03: unique symbol;
	readonly s04: unique symbol; readonly s05: unique symbol;
	readonly s06: unique symbol; readonly s07: unique symbol;
	readonly s08: unique symbol; readonly s09: unique symbol;
	readonly s10: unique symbol; readonly s11: unique symbol;
	readonly s12: unique symbol; readonly s13: unique symbol;
	readonly s14: unique symbol; readonly s15: unique symbol;
	readonly s16: unique symbol; readonly s17: unique symbol;
	readonly s18: unique symbol; readonly s19: unique symbol;
	readonly s20: unique symbol; readonly s21: unique symbol;
	readonly s22: unique symbol; readonly s23: unique symbol;
	readonly s24: unique symbol; readonly s25: unique symbol;
	readonly s26: unique symbol; readonly s27: unique symbol;
	readonly s28: unique symbol; readonly s29: unique symbol;
	readonly s30: unique symbol; readonly s31: unique symbol;
	readonly s32: unique symbol; readonly s33: unique symbol;
	readonly s34: unique symbol; readonly s35: unique symbol;
	readonly s36: unique symbol; readonly s37: unique symbol;
	readonly s38: unique symbol; readonly s39: unique symbol;
	readonly s40: unique symbol; readonly s41: unique symbol;
	readonly s42: unique symbol; readonly s43: unique symbol;
	readonly s44: unique symbol; readonly s45: unique symbol;
	readonly s46: unique symbol; readonly s47: unique symbol;
	readonly s48: unique symbol; readonly s49: unique symbol;
	readonly s50: unique symbol; readonly s51: unique symbol;
	readonly s52: unique symbol; readonly s53: unique symbol;
	readonly s54: unique symbol; readonly s55: unique symbol;
	readonly s56: unique symbol; readonly s57: unique symbol;
	readonly s58: unique symbol; readonly s59: unique symbol;
	readonly s60: unique symbol; readonly s61: unique symbol;
	readonly s62: unique symbol; readonly s63: unique symbol;
};

export type DeepReadonlySlotToKey = {
	 0: 's00';  1: 's01';  2: 's02';  3: 's03';  4: 's04';
	 5: 's05';  6: 's06';  7: 's07';  8: 's08';  9: 's09';
	10: 's10'; 11: 's11'; 12: 's12'; 13: 's13'; 14: 's14';
	15: 's15'; 16: 's16'; 17: 's17'; 18: 's18'; 19: 's19';
	20: 's20'; 21: 's21'; 22: 's22'; 23: 's23'; 24: 's24';
	25: 's25'; 26: 's26'; 27: 's27'; 28: 's28'; 29: 's29';
	30: 's30'; 31: 's31'; 32: 's32'; 33: 's33'; 34: 's34';
	35: 's35'; 36: 's36'; 37: 's37'; 38: 's38'; 39: 's39';
	40: 's40'; 41: 's41'; 42: 's42'; 43: 's43'; 44: 's44';
	45: 's45'; 46: 's46'; 47: 's47'; 48: 's48'; 49: 's49';
	50: 's50'; 51: 's51'; 52: 's52'; 53: 's53'; 54: 's54';
	55: 's55'; 56: 's56'; 57: 's57'; 58: 's58'; 59: 's59';
	60: 's60'; 61: 's61'; 62: 's62'; 63: 's63';
};

export type DeepReadonlySlot = keyof DeepReadonlySlotToKey;

export type DeepReadonlyPathSlot<Path extends readonly PropertyKey[]> =
	Path['length'] extends DeepReadonlySlot ? Path['length'] : never;
