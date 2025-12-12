interface DisplayItem {
	/**项目的名字 */
	readonly name: string;
	/**项目的背景图标 */
	readonly icon?: string;
	/**项目打底色 */
	readonly bg?: string;
}
export enum IdeType {
	Vscode = 'vscode',
	Vim = 'vim',
	Click = 'click',
}
interface VscodeInfo {
	readonly fileName: string;
	readonly type: IdeType.Vscode;
	readonly admin?: boolean;
}
interface VimInfo {
	readonly path: string;
	readonly type: IdeType.Vim;
}
interface ClickInfo {
	onclick(): void;
	readonly type?: IdeType.Click;
	readonly fileName?: string;
}
type IdeInfo = VimInfo | VscodeInfo | ClickInfo;
interface OtherInfo {
	readonly preclick?: () => void;
}
export type Info = DisplayItem & IdeInfo & OtherInfo;

interface ListTitle {
	readonly name: string;
	readonly path: string;
}
export type InfoList = readonly [
	ListTitle,
	...(Info | InfoList)[],
];
export interface SideInfo {
	readonly name: string;
	action(): void;
}
export enum CacheMethod {
	Python = 'python',
	Nodejs = 'nodejs',
}
export interface Config {
	/**VSCode 的位置 */
	readonly code?: string;
	readonly openTerminal?: () => void;
	readonly bgp: string;
	readonly maxBgp: number;
	readonly cacheMethod: CacheMethod;
	readonly workspace: readonly (Info | InfoList)[];
	readonly sidebar: readonly SideInfo[];
	readonly ctrlAction?: () => void;
	readonly homeBg?: boolean;
}
export namespace Default {
	export const ctrlAction = () => window.close();
}
declare global {
	let CONFIG: Config | undefined;
	const workspaceDir: string;
}

if (isRuntime()) {
	// @ts-ignore
	window.workspaceDir = workspaceDir;
	typeof CONFIG === 'undefined'
		? CONFIG = require('../workspace/config').config
		: CONFIG;
} else {
	// @ts-ignore
	globalThis.workspaceDir = '';
	// @ts-ignore
	globalThis.CONFIG = null as any;
}
export const config: Config = CONFIG!;

export function isRuntime() {
	return typeof document !== 'undefined';
}

export function build({ workspaceDir = '' }) {
	if (isRuntime()) return;
	if (!workspaceDir) workspaceDir = __dirname + '/workspace';
	const n: typeof import('child_process') = require('child_process'.split('_').join('_'));
	n.exec(
		`WORKSPACE_DIR="${workspaceDir}" pnpm build`,
		(error, stdout, stderr) => {
			console.log('error:');
			console.log(error);
			console.log('stdout:');
			console.log(stdout);
			console.log('stderr:');
			console.log(stderr);
		},
	);
}

