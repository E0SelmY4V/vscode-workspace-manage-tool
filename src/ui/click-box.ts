import { config, Default, IdeType, Info, InfoList } from '../config';
import { prominentSpan, randomBgColor } from '../lib/scpoui';
import { gele, Cele, thr } from '../lib/util';

export class ClickBox extends Cele<'span'> {
	readonly color = randomBgColor();
	readonly bg = gele('div', { className: 'llist_bg' });
	readonly uri: string;
	readonly admin: boolean;
	readonly preclick?: () => void;
	readonly type: IdeType;
	override readonly className = 'llist_nbox';
	override readonly onmouseover = () => {
		this.bg.style.display = 'none';
		this.style.background = this.color;
	};
	override readonly onmouseout = () => {
		this.bg.style.display = 'block';
		this.style.background = '';
		if (this.timer) clearTimeout(this.timer);
	};
	private timer?: number;
	override readonly onclick = () => {
		this.preclick?.();
		switch (this.type) {
			case IdeType.Vscode:
				config.code
					? runcode(config.code, this.uri, this.admin)
					: thr(Error());
				break;
			case IdeType.Vim:
				runvim('Ubuntu', this.uri);
				config.openTerminal?.();
				break;
		}
		this.onmouseout();
		const backToOvering: TimerHandler = this.onmouseover;
		this.timer = setTimeout(backToOvering, 120);
		if ((event as MouseEvent).ctrlKey) (config.ctrlAction ?? Default.ctrlAction)();
	};
	constructor(info: Info, pathNow: string) {
		super('span');
		this.bg.style.background = info.bg ?? '';
		this.uri = 'path' in info
			? info.path
			: pathNow + (info.fileName ?? '');
		this.admin = ('admin' in info && info.admin) ?? false;
		this.preclick = info.preclick;
		this.type = info.type ?? IdeType.Click;
		if ('onclick' in info) this.onclick = info.onclick;
		this.addNode([
			this.bg,
			gele('div', {
				className: 'llist_nblk',
				style: {
					background: info.icon ? '' : this.color,
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
		]);
	}
}

export function createClickList(pathNow: string, list: readonly (Info | InfoList)[]): HTMLElement[] {
	return list.map(info => {
		if (!(info instanceof Array)) return new ClickBox(info, pathNow);
		const [{ name, path }, ...infos] = info;
		return gele('div', {
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
				...createClickList(pathNow + path + '\\', infos),
			],
		});
	});
}
