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
	const CONFIG: Config;
}

