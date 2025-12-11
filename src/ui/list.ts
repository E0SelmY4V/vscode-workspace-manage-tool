import { randomBgColor } from '../lib/scpoui';
import { gid } from '../lib/util';
import '../vbs';
import { createClickList } from './click-box';
import { getSideBox } from './side-box';

export function list() {
	if (CONFIG.homeBg) gid('llist_home', 'span').style.backgroundColor = randomBgColor();
	createClickList(gid('llist', 'div'), '', CONFIG.workspace);
	CONFIG.sidebar.map(info => gid('ltool', 'div').appendChild(getSideBox(info)));
}
