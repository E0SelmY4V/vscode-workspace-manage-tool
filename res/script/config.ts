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
}
interface VscodeInfo {
	readonly file: string;
	readonly type?: IdeType.Vscode;
	readonly admin?: boolean;
}
interface VimInfo {
	readonly uri: string;
	readonly type: IdeType.Vim;
}
type IdeInfo = VimInfo | VscodeInfo;
interface Clickable {
	readonly preclick?: () => void;
	readonly onclick?: () => void;
}
export type Info = DisplayItem & IdeInfo & Clickable;

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
export interface Config {
	/**VSCode 的位置 */
	readonly code?: string;
	readonly openTerminal?: () => void;
	readonly bgp: string;
	readonly maxBgp: number;
	readonly cacheMethod: 'python' | 'node';
	readonly workspace: readonly (Info | InfoList)[];
	readonly sidebar: readonly SideInfo[];
}
declare global {
	const CONFIG: Config;
}

