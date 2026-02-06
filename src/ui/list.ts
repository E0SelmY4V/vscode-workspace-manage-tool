import { config } from '../config';
import { randomBgColor } from '../lib/scpoui';
import { gid } from '../lib/util';
import '../vbs';
import { createClickList } from './click-box';
import { SideBox } from './side-box';

export function list() {
	if (config.homeBg) gid('llist_home', 'span').style.backgroundColor = randomBgColor();
	createClickList(gid('llist', 'div'), '', config.workspace);
	config.sidebar.map(info => gid('ltool', 'div').appendChild(new SideBox(info)));
}
