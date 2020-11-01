const {defaults} = require('jest-config');

module.exports = {
	roots: [
		"./services/gateway/test",
	],
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
			tsConfig: "./tsconfig.json",
			isolatedModules: true
		}
	},
	testEnvironment: 'node',
	testTimeout: 30000
};