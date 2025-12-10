import '../vbs';

export function sinonum(num: string): string {
	return exec(`${getDir()}res/script/sinonum/rust/target/release/sinonum.exe -e gbk "${num}"`);
}

