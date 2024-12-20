/**
 * @typedef {{
 *   name: string;
 *   icon?: string;
 *   admin?: boolean;
 *   preclick?: () => void;
 *   bg?: string;
 * } & (
 *   | { file: string; }
 *   | { file?: string; onclick(): void; }
 * )} WorkspaceInfo
 */
/**
 * @typedef {[
 *   { name: string; path: string; },
 *   ...(WorkspaceInfo | WorkspaceInfoList)[],
 * ]} WorkspaceInfoList
 */
/**
 * @typedef {{
 *   code: string;
 *   bgp: string;
 *   maxBgp: number;
 *   cacheMethod: 'python' | 'node';
 *   workspace: (WorkspaceInfo | WorkspaceInfoList)[];
 *   sidebar: {
 *     name: string;
 *     action(): void;
 *   }[];
 * }} Config
 */

/**@type {Config} */
var CONFIG = {
	code: "E:\\VSCode\\Code.exe",
	bgp: "https://source.unsplash.com/1920x1080/?snow,nature",
	maxBgp: 10,
	cacheMethod: 'python',
	workspace: [],
	sidebar: []
};