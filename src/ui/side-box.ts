import { config, Default, SideInfo } from '../config';
import { randomBgColor } from '../lib/scpoui';
import { Cele, gele } from '../lib/util';

export class Cover extends Cele<'div'> {
	private timer?: number;
	override readonly className = 'ltool_cover';
	override readonly innerHTML = 'mmmmmmmmmmm';
	override readonly onmouseover = () => {
		this.sideBox.style.background = this.sideBox.color;
	};
	override readonly onmouseout = () => {
		this.sideBox.style.background = '';
		clearTimeout(this.timer);
	};
	override readonly onclick = () => {
		this.sideBox.style.background = '';
		const backToOvering: TimerHandler = this.onmouseover;
		this.timer = setTimeout(backToOvering, 120);
		this.sideBox.clickdo();
		if ((event as MouseEvent).ctrlKey) (config.ctrlAction ?? Default.ctrlAction)();
	};
	constructor(
		protected readonly sideBox: SideBox,
	) { super('div'); }
}

export class SideBox extends Cele<'div'> {
	readonly color = randomBgColor();
	readonly clickdo: () => void;
	override readonly className = 'ltool_nbox';
	override readonly innerHTML = '&nbsp;';
	constructor(info: SideInfo) {
		super('div');
		this.clickdo = info.action;
		this.addNode([
			...[2, 1, 0].map(i => gele('span', {
				innerHTML: info.name,
				className: `ltool_ntxt${i}`,
			})),
			new Cover(this),
		]);
	}
}

