export type Tostrable = string | number | null | undefined | boolean;
export type Dereadonly<T> = { -readonly [K in keyof T]: T[K] };

/**
 * 字符串拼出错误
 * @param infos 错误信息
 */
export function getError(...infos: Tostrable[]) {
	return Error(infos.join('\n'));
}
export function thr(error: unknown): never {
	throw error;
}

/**
 * 合并两个对象
 * @param from 源对象
 * @param to 目标对象
 * @param skipKeys 源对象要忽略的键
 */
export function merge<T, K extends string>(
	from: (Partial<Readonly<Omit<T, K>>> & Record<K, unknown>) | undefined,
	to: T,
	skipKeys: K[],
): void;
export function merge<T>(from: Partial<Readonly<T>> | undefined, to: T): void;
export function merge(
	from: Record<string, unknown> | undefined,
	to: Record<string, unknown>,
	skipKeys: string[] = [],
) {
	if (typeof from === 'undefined') return;
	for (const key in from) {
		if ((skipKeys as string[]).includes(key)) continue;
		// @ts-ignore
		const prop = from[key];
		if (typeof prop !== 'undefined') try {
			// @ts-ignore
			to[key] = prop;
		} catch (cause) {
			throw Error('合并 ' + key + ' 错误');
		}
	}
}

/**
 * 用 id 获得元素并验证类型
 * @param id 元素 id
 * @param tag
 */
export function gid<K extends gele.Tags>(id: string, tag: K): HTMLElementTagNameMap[K] {
	const ele = document.getElementById(id) ?? thr(getError('找不到:', id, tag));
	if (ele.tagName.toLowerCase() !== tag) thr(getError('错误的标签', id, tag, ele.tagName));
	// @ts-ignore
	return ele;
}


/**
 * 方便地获得一个元素
 * @param tag 元素的标签
 */
export function gele<K extends gele.Tags, T extends gele.PropsMap<K>>(
	tag: K,
	props?: T,
): HTMLElementTagNameMap[K] & Dereadonly<typeof props> {
	const ele = document.createElement(tag);
	if (typeof props === 'undefined') return ele as any;
	merge(props, ele, ['nodes', 'style']);
	props.nodes?.map(node => ele.appendChild(node));
	merge(props.style, ele.style);
	return ele as any;
}
export namespace gele {
	export type Tags = keyof HTMLElementTagNameMap;
	interface OtherOption {
		nodes: readonly HTMLElement[];
		style: Readonly<Partial<CSSStyleDeclaration>>;
	}
	interface PartOtherOption extends Readonly<Partial<OtherOption>> { }
	export type PropsMap<K extends Tags>
		= Readonly<Partial<Omit<HTMLElementTagNameMap[K], keyof OtherOption>>>
		& PartOtherOption
		& Record<string, unknown>;
}

