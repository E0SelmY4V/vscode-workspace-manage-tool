import { config, Default, SideInfo } from '../config';
import { randomBgColor } from '../lib/scpoui';
import { gele } from '../lib/util';

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
		if ((event as MouseEvent).ctrlKey) (config.ctrlAction ?? Default.ctrlAction)();
	}
}
export function getSideBox(info: SideInfo): SideBox {
	const nbox = gele('div', {
		className: 'ltool_nbox',
		innerHTML: '&nbsp;',
		color: randomBgColor(),
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

