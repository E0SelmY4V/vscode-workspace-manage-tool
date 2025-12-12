import { buildSync } from 'esbuild';
import { relative } from 'node:path';

const runtimeDir = process.env.RUNTIME_DIR ?? __dirname;
const workspaceDirOri = process.env.WORKSPACE_DIR ?? __dirname + '/workspace';
const workspaceDir = JSON.stringify(relative(runtimeDir, workspaceDirOri).replace(/\//g, '\\'));
buildSync({
	entryPoints: ['./dist/src/onload.js'],
	outfile: './res/script/dist.js',
	format: 'iife',
	target: 'es5',
	bundle: true,
	define: {
		workspaceDir,
	},
});
