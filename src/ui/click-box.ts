import { config, Default, IdeType, Info, InfoList } from '../config';
import { prominentSpan, randomBgColor } from '../lib/scpoui';
import { gele, thr } from '../lib/util';


interface ClickBox extends HTMLSpanElement {
	timer?: number;
	readonly color: string;
	readonly uri: string;
	readonly admin: boolean;
	readonly preclick?: () => void;
	readonly type: IdeType;
	readonly bg: HTMLDivElement;
}
namespace ClickBox {
	export function mouseOver(n: ClickBox) {
		n.bg.style.display = 'none';
		n.style.background = n.color;
	}
	export function mouseOut(n: ClickBox) {
		n.bg.style.display = 'block';
		n.style.background = '';
		if (n.timer) clearTimeout(n.timer);
	}
	export function open(n: ClickBox) {
		n.preclick?.();
		switch (n.type) {
			case IdeType.Vscode:
				config.code
					? runcode(config.code, n.uri, n.admin)
					: thr(Error());
				break;
			case IdeType.Vim:
				runvim('Ubuntu', n.uri);
				config.openTerminal?.();
				break;
		}
		mouseOut(n);
		n.timer = setTimeout((() => { mouseOver(n); }) as TimerHandler, 120);
		if ((event as MouseEvent).ctrlKey) (config.ctrlAction ?? Default.ctrlAction)();
	};
}
export function getClickBox(info: Info, pathNow: string): ClickBox {
	const color = randomBgColor();
	const bg = gele('div', {
		className: 'llist_bg',
		style: {
			background: info.bg ?? '',
		},
	});
	const nbox = gele('span', {
		className: 'llist_nbox',
		color,
		bg,
		onmouseover: () => ClickBox.mouseOver(nbox),
		onmouseout: () => ClickBox.mouseOut(nbox),
		uri: 'path' in info ? info.path : pathNow + (info.fileName ?? ''),
		admin: ('admin' in info && info.admin) ?? false,
		preclick: info.preclick,
		onclick: 'onclick' in info ? info.onclick : () => ClickBox.open(nbox),
		type: info.type ?? IdeType.Click,
		nodes: [
			bg,
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
					...prominentSpan(info.name, 'llist_ntxt', 2),
				],
			}),
		],
	});
	return nbox;
}

export function createClickList(node: HTMLDivElement, pathNow: string, list: readonly (Info | InfoList)[]) {
	list.map(info => {
		if (info instanceof Array) {
			const [{ name, path }, ...infos] = info;
			const nbox = gele('div', {
				className: 'llist_group',
				nodes: [
					gele('span', {
						nodes: [
							gele('div', { className: 'blurBG' }),
							gele('div', { className: 'llist_line' }),
							gele('h3', { innerHTML: name }),
						],
						className: 'llist_title',
					}),
					gele('br'),
				],
			});
			node.appendChild(nbox);
			return createClickList(nbox, pathNow + path + '\\', infos);
		}
		node.appendChild(getClickBox(info, pathNow));
	});
}
