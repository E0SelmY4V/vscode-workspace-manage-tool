/**@import { ConfigArray } from 'typescript-eslint'; */
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import accurtypeStyle from 'eslint-config-accurtype-style';
import { getDirname } from 'esm-entry';
import tseslint from 'typescript-eslint';

/**@type {ConfigArray} */
const config = defineConfig(
	...accurtypeStyle,
	eslint.configs.recommended,
	...tseslint.configs.stylisticTypeChecked,
	{
		name: 'TS Base Config',
		languageOptions: {
			parserOptions: {
				tsconfigRootDir: getDirname(import.meta.url),
				project: [
					'tsconfig.json',
				],
			},
		},
	},
	{
		name: 'Opt Rules',
		rules: {
			'no-unused-vars': 'off',
			'no-undef': 'off',
		},
	},
	{
		name: 'Global Ignore',
		ignores: [
			'**/*.md',
			'.*',
			'res/**/*.js',
			'workspace/**/*.js',
			'cz-config.cjs',
			'**/dist',
		],
	},
);

export default config;
