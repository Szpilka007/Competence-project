const {defaults} = require('jest-config');

module.exports = {
	preset: 'ts-jest',
	moduleFileExtensions: [
		...defaults.moduleFileExtensions,
		'test.ts',
		'spec.ts',
		'test.tsx',
	],
	globals: {
		"ts-jest": {
			diagnostics: false,
			tsconfig: "./tsconfig.json",
			isolatedModules: true
		}
	},
	testEnvironment: 'node',
	testTimeout: 30000
};