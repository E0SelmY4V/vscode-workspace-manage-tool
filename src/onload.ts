import { list } from './ui/list';
import { timeGO } from './ui/time';
import * as Scpos from './lib/bgp';

declare global {
	namespace globalThis {
		export import ScpoUI = Scpos;
	}
}
globalThis.ScpoUI = Scpos;
window.onload = () => {
	timeGO();
	list();
};

