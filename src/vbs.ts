declare global {
	function getDir(): string;
	function reqBgp(No: number): void;
	function runcode(code: string, file: string, admin: boolean): void;
	function runvim(d: string, folder: string): void;
	function runfile(file: string, show: boolean, sync: boolean): void;
	function exec(command: string): string;
}

export { };
