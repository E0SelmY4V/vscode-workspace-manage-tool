Object.defineProperty = function (o, p, d) {
	// @ts-ignore
	if (d.value) o[p] = d.value;
	return o;
};
// @ts-ignore
const globalThis = window;
Object.getOwnPropertyNames = function (o) {
	const keys = [];
	for (const key in o) keys.push(key);
	return keys;
};

Array.prototype.map = function <T>(callbackfn: (value: any, index: number, array: any[]) => T) {
	const results: T[] = [];
	for (let i = 0; i < this.length; ++i) results.push(callbackfn(this[i], i, this));
	return results;
};
Array.prototype.fill = function (v, start = 0, end) {
	if (start < 0) start = this.length - start;
	if (end === void 0) end = this.length;
	if (end < 0) end = this.length - end;
	return this.map((ori, i) => (i >= start && i < end ? v : ori));
};
Array.prototype.includes = function (n, fromIndex) {
	let flag = false;
	this.slice(fromIndex).map(e => flag ||= e === n);
	return flag;
};
// @ts-ignore
const HTMLElement = Object;


