/// <reference path="./run.ts" />

import './config';
import { IdeType, Info, InfoList, SideInfo } from './config';
import { gele, gid, thr } from './util';

function randomBGC() {
	const color = [
		'#dc1a0e',
		'#01cd0f',
		'#f2e722',
		'#04c3f2',
		'#da5bc5',
	];
	return color[Math.floor(Math.random() * color.length)];
}
interface ClickBox extends HTMLSpanElement {
	timer?: number;
	readonly color: string;
	readonly uri: string;
	readonly admin: boolean;
	readonly preclick?: () => void;
	readonly type: IdeType;
}
function end(e: MouseEvent) {
	if (e.ctrlKey) window.close();
}
namespace ClickBox {
	export function mouseOver(n: ClickBox) {
		n.getElementsByTagName('div')[0].style.display = 'none';
		n.style.background = n.color;
	}
	export function mouseOut(n: ClickBox) {
		n.getElementsByTagName('div')[0].style.display = 'block';
		n.style.background = '';
		if (n.timer) clearTimeout(n.timer);
	}
	export function open(n: ClickBox) {
		n.preclick?.();
		switch (n.type) {
			case IdeType.Vscode:
				CONFIG.code
					? runcode(CONFIG.code, n.uri, n.admin)
					: thr(Error());
				break;
			case IdeType.Vim:
				runvim('Ubuntu', n.uri);
				CONFIG.openTerminal?.();
				break;
		}
		mouseOut(n);
		n.timer = setTimeout((() => { mouseOver(n); }) as TimerHandler, 120);
		end(event as MouseEvent);
	};
}
function getClickBox(info: Info, pathNow: string): ClickBox {
	const color = randomBGC();
	const nbox = gele('span', {
		className: 'llist_nbox',
		color,
		onmouseover: () => ClickBox.mouseOver(nbox),
		onmouseout: () => ClickBox.mouseOut(nbox),
		uri: 'uri' in info ? info.uri : pathNow + info.file,
		admin: ('admin' in info && info.admin) ?? false,
		preclick: info.preclick,
		onclick: info.onclick ?? (() => ClickBox.open(nbox)),
		type: info.type ?? IdeType.Vscode,
		nodes: [
			gele('div', {
				className: 'llist_bg',
				style: {
					background: info.bg ?? '',
				},
			}),
			gele('div', {
				className: 'llist_nblk',
				style: {
					background: info.icon ? '' : color,
				},
				nodes: [
					info.icon && gele('img', {
						src: info.icon,
						style: {
							width: '100%',
							height: '100%',
							position: 'absolute',
						},
					}),
					...[1, 0].map(i => gele('span', {
						innerHTML: info.name,
						className: `llist_ntxt${i}`,
					})),
				],
			}),
		],
	});
	return nbox;
}
function createList(node: HTMLDivElement, pathNow: string, li: readonly (Info | InfoList)[]) {
	li.map(info => {
		if (info instanceof Array) {
			const [{ name, path }, ...infos] = info;
			const nbox = gele('div', {
				className: 'llist_group',
				nodes: [
					gele('span', {
						innerHTML: `<div class="blurBG"></div><div class="llist_line"></div><h3>${name}</h3>`,
						className: 'llist_title',
					}),
					gele('br'),
				],
			});
			node.appendChild(nbox);
			return createList(nbox, pathNow + path + '\\', infos);
		}
		node.appendChild(getClickBox(info, pathNow));
	});
}

interface SideBox extends HTMLDivElement {
	readonly color: string;
	clickdo(): void;
	timer?: number;
}
namespace SideBox {
	export function tmon(n: SideBox) {
		n.style.background = n.color;
	}
	export function tmout(n: SideBox) {
		n.style.background = '';
		clearTimeout(n.timer);
	}
	export function tclick(n: SideBox) {
		n.style.background = '';
		n.timer = setTimeout((() => { tmon(n); }) as TimerHandler, 120);
		n.clickdo();
		end(event as MouseEvent);
	}
}
function getSideBox(info: SideInfo): SideBox {
	const nbox = gele('div', {
		className: 'ltool_nbox',
		innerHTML: '&nbsp;',
		color: randomBGC(),
		clickdo: info.action,
		nodes: [
			...[2, 1, 0].map(i => gele('span', {
				innerHTML: info.name,
				className: `ltool_ntxt${i}`,
			})),
			gele('div', {
				className: 'ltool_cover',
				onmouseover: () => SideBox.tmon(nbox),
				onmouseout: () => SideBox.tmout(nbox),
				onclick: () => SideBox.tclick(nbox),
				innerHTML: 'mmmmmmmmmmm',
			}),
		],
	});
	return nbox;
}
export function list() {
	gid('llist_home', 'span').style.backgroundColor = randomBGC();
	createList(gid('llist', 'div'), '', CONFIG.workspace);
	CONFIG.sidebar.map(info => gid('ltool', 'div').appendChild(getSideBox(info)));
}
