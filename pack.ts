import { buildSync } from 'esbuild';

buildSync({
	entryPoints: ['./dist/res/script/bgp.js'],
	outdir: './res/script/dist',
	format: 'iife',
	target: 'es5',
	bundle: true,
});
