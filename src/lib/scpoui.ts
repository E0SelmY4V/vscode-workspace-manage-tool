import { Cele, gele, merge } from './util';

declare global {
	interface HTMLElement {
		/**IE 才有的一个样式对象属性 */
		currentStyle: ReturnType<typeof getComputedStyle>;
		/**元素改变大小时的回调函数 */
		scpoResizeFns?: (() => void)[];
	}
}

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

/**改变大小时需要运行的函数 */
export type ResizeFns = readonly (() => void)[];
/**检测大小改变的 iframe */
export class ResizeIframe extends Cele<'iframe'> {
	override readonly onresize = () => this.resizeFns.map(f => f());
	constructor(
		protected readonly resizeFns: ResizeFns,
	) {
		super('iframe');
		merge({
			height: '100%',
			width: '100%',
		}, this.style);
	}
}
/**带着 iframe 的盒子 */
export class ResizeBox extends Cele<'div'> {
	/**每个 TesterBox 里 TesterIframe 的数量 */
	protected static iframeNumber = 1;
	/**所有的 TesterBox */
	protected static resizeBoxs: ResizeBox[] = [];
	/**设置或查询所有 TesterBox 里 TesterIframe 的数量 */
	static checkIframeNumber(n: null | number = null): number {
		if (n !== null) {
			this.resizeBoxs.map(e => e.setIframeNumber(n));
			this.iframeNumber = n;
		}
		return this.iframeNumber;
	}

	protected readonly iframes: HTMLIFrameElement[] = [];
	/**设置 TesterBox 里 TesterIframe 的数量 */
	protected readonly setIframeNumber = (n: number) => {
		while (this.iframes.length < n) {
			this.iframes.push(this.appendChild(new ResizeIframe(this.resizeFns)));
		}
		while (this.iframes.length > n) {
			const iframe = this.iframes.pop();
			if (iframe) this.removeChild(iframe);
		}
	};
	constructor(
		node: HTMLElement,
		protected readonly resizeFns: (() => void)[] = [],
	) {
		super('div');
		ResizeBox.resizeBoxs.push(this);
		node.appendChild(this);
		setBackground(this, node);
		merge({
			background: '#333',
			zIndex: '-9999',
		}, this.style);
		this.setIframeNumber(ResizeBox.iframeNumber);
		node.scpoResizeFns = resizeFns;
	}
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
		const [xFact, yFact] = [boxNode.clientWidth, boxNode.clientHeight];
		const [x, y] = xFact / yFact < scale
			? [Math.ceil(yFact * scale), yFact]
			: [xFact, Math.ceil(xFact / scale)];
		merge({
			width: x + 'px',
			height: y + 'px',
			left: (xFact - x) / 2 + 'px',
			top: (yFact - y) / 2 + 'px',
		}, picNode.style);
	}
	new ResizeBox(dadNode, [resizeFn]);
	picNode.onload = () => {
		scale = picNode.width / picNode.height;
		resizeFn();
		boxNode.appendChild(picNode);
	};
}

const bgColor = [
	'#dc1a0e',
	'#01cd0f',
	'#f2e722',
	'#04c3f2',
	'#da5bc5',
];
export function randomBgColor() {
	return bgColor[Math.floor(Math.random() * bgColor.length)];
}

export function prominentSpan(
	innerHTML: string,
	className: string,
	size: number,
): HTMLSpanElement[] {
	return Array(size)
		.fill(size - 1)
		.map((v, i) => v - i)
		.map(i => gele('span', { innerHTML, className: `${className}${i}` }));
}
