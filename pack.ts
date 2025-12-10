import { buildSync } from 'esbuild';

buildSync({
	entryPoints: ['./dist/src/onload.js'],
	outfile: './res/script/dist.js',
	format: 'iife',
	target: 'es5',
	bundle: true,
});
