import * as Scpos from './bgp.js';
import { gele, merge } from './util.js';

declare global {
	namespace globalThis {
		export import ScpoUI = Scpos;
	}
	interface HTMLElement {
		/**IE 才有的一个样式对象属性 */
		currentStyle: ReturnType<typeof getComputedStyle>;
		/**元素改变大小时的回调函数 */
		scpoResizeFns?: (() => void)[];
	}
}

globalThis.ScpoUI = Scpos;
/**获得样式对象 */
export function getStyle(node: HTMLElement) {
	return document.defaultView
		? document.defaultView.getComputedStyle(node)
		: node.currentStyle;
}

/**把 `node` 变成 `dadNode` 的背景元素 */
export function setBackground<T extends HTMLElement>(bgNode: T, dadNode: HTMLElement) {
	const dadIsBody = Boolean(
		(dadNode.localName
			? dadNode.localName
			: dadNode.nodeName
		).toLowerCase().indexOf('body') + 1,
	);
	merge({
		position: dadIsBody ? 'fixed' : 'absolute',
		top: '0',
		left: '0',
		margin: '0',
		padding: '0',
		zIndex: '-999',
		overflow: 'hidden',
		height: '100%',
		width: '100%',
	}, bgNode.style);
	if (getStyle(dadNode).position == 'static') dadNode.style.position = 'relative';
	return bgNode;
}

/**改变大小的函数 */
export type ResizeFn = () => void;
/**带着 iframe 的盒子 */
export interface ResizeBox extends HTMLDivElement {
	iframes: HTMLIFrameElement[];
	resizeFns: ResizeFn[];
}
/**检测大小改变的 iframe */
export interface ResizeIframe extends HTMLIFrameElement {
	resizeFns: ResizeFn[];
}
export namespace ResizeIframe {
	export function onResize(this: ResizeIframe) {
		this.resizeFns.map(f => f());
	}
	export function onLoad(this: ResizeIframe) {
		this.onresize = onResize as any;
	}
}
/**给 boxNode 添加一个 TesterIframe */
function getResizeIframe(box: ResizeBox, resizeFns: (() => void)[]): ResizeIframe {
	const iframe = gele('iframe', {
		resizeFns,
		style: { height: '100%', width: '100%' },
	});
	box.iframes.push(box.appendChild(iframe));
	if (iframe.contentWindow === null) throw Error();
	iframe.onload = iframe.contentWindow.onload = ResizeIframe.onLoad as any;
	return iframe;
}
/**每个 TesterBox 里 TesterIframe 的数量 */
let iframeNumber = 1;
/**设置或查询 TesterBox 里 TesterIframe 的数量 */
export function checkIframeNumber(n: null | number = null) {
	if (n !== null) {
		resizeBoxs.map(e => {
			while (e.iframes.length < n) getResizeIframe(e, e.resizeFns);
			while (e.iframes.length > n) e.removeChild(e.iframes.pop()!);
		});
		iframeNumber = n;
	}
	return iframeNumber;
}
/**所有的 TesterBox */
export const resizeBoxs: ResizeBox[] = [];
/**给 `node` 元素添加 onresize 函数 */
export function pushResizeFn(node: HTMLElement, fn: () => void) {
	if (node.scpoResizeFns) return node.scpoResizeFns.push(fn);
	const resizeFns = node.scpoResizeFns = [fn];
	const boxNode: ResizeBox = gele('div', {
		resizeFns,
		iframes: [],
		style: { background: '#333' },
	});
	resizeBoxs.push(node.appendChild(setBackground(boxNode, node)));
	boxNode.style.zIndex = '-9999';
	checkIframeNumber(iframeNumber);
	return 1;
}
/**获得当前 script 标签所在的标签 */
export function getDadNode() {
	const scriptNow = document.scripts;
	const dadNode = scriptNow[scriptNow.length - 1].parentNode;
	if (dadNode === null) return document;
	return dadNode;
}
/**创建背景图 */
export function createBGP(dadNode: HTMLElement, src: string) {
	const picNode = gele('img', {
		src,
		style: { position: 'relative' },
	});
	const boxNode = gele('div', {
		nodes: [picNode],
	});
	dadNode.insertBefore(setBackground(boxNode, dadNode), dadNode.firstChild);
	let scale: number;
	function resizeFn() {
		let x = boxNode.clientWidth;
		let y = boxNode.clientHeight;
		const yFact = y;
		const xFact = x;
		x / y < scale ? x = y * scale : y = x / scale;
		x += 2;
		y += 2;
		merge({
			width: x + 'px',
			height: y + 'px',
			left: (xFact - x) / 2 + 'px',
			top: (yFact - y) / 2 + 'px',
		}, picNode.style);
	}
	pushResizeFn(dadNode, resizeFn);
	picNode.onload = function () {
		scale = picNode.width / picNode.height;
		resizeFn();
		boxNode.appendChild(picNode);
	};
	// @ts-ignore
	if (picNode.readystate == 'complete') picNode.onload();
}

