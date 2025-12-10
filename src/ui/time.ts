import { sinonum } from '../lib/sinonum';
import { gid } from '../lib/util';

const units = ['点', '分', '秒'];
function getTime() {
	const date = new Date();
	const times = [date.getHours(), date.getMinutes(), date.getSeconds()];
	gid('ltime_chn', 'a').innerText = times.map((n, i) => sinonum(`${n}`) + units[i]).join('');
	gid('ltime_num', 'h1').innerText = times.map(n => (n < 10 ? `${0}${n}` : `${n}`)).join(':');
}
export function timeGO(): number {
	getTime();
	return setInterval(getTime as TimerHandler, 1000);
}

