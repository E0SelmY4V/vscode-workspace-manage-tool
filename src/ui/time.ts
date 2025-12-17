import { sinonum } from '../lib/sinonum';
import { gid } from '../lib/util';

const units = ['点', '分', '秒'];
type Times = readonly [number, number, number];
let preTimes: Times = [0, 0, 0];
function updateTime() {
	const date = new Date();
	const times: Times = [date.getHours(), date.getMinutes(), date.getSeconds()];
	if (times.join(',') === preTimes.join(',')) return;
	preTimes = times;
	gid('ltime_chn', 'a').innerText = sinonum(times.map(String))
		.map((s, i) => s + units[i])
		.join('');
	gid('ltime_num', 'h1').innerText = times.map(n => (n < 10 ? `${0}${n}` : `${n}`)).join(':');
}
export function timeStartShow(): number {
	updateTime();
	return setInterval(updateTime as TimerHandler, 200);
}
