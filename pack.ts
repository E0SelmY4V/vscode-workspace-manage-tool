import { buildSync } from 'esbuild';

buildSync({
	entryPoints: [],
	outdir: './res/script/dist',
	format: 'iife',
	target: 'es5',
	bundle: true,
});
