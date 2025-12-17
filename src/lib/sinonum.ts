import '../vbs';

export function sinonum(num: readonly string[]): string[] {
	return exec(`${getDir()}res/script/sinonum/rust/target/release/sinonum.exe -e gbk "${num.join('" "')}" -l with-unit -y avoid`).split('\n');
}

