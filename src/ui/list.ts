import { config } from '../config';
import { randomBgColor } from '../lib/scpoui';
import { gid } from '../lib/util';
import '../vbs';
import { createClickList } from './click-box';
import { SideBox } from './side-box';

export function list() {
	if (config.homeBg) gid('llist_home', 'span').style.backgroundColor = randomBgColor();
	const clickListDiv = gid('llist', 'div');
	createClickList('', config.workspace).map(n => clickListDiv.appendChild(n));
	const sideListDiv = gid('ltool', 'div');
	config.sidebar.map(info => sideListDiv.appendChild(new SideBox(info)));
}
