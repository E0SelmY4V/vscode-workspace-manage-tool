import { list } from './ui/list';
import { timeStartShow } from './ui/time';
import * as Scpos from './lib/scpoui';

declare global {
	namespace globalThis {
		export import ScpoUI = Scpos;
	}
}
globalThis.ScpoUI = Scpos;
window.onload = () => {
	timeStartShow();
	list();
};

