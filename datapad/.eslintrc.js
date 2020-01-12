module.exports = {
	parser: '@typescript-eslint/parser', // Specifies the ESLint parser
	plugins: ['jsdoc', '@typescript-eslint'],
	extends: [
		'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
		'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
		'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
		'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
	],
	parserOptions: {
		ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
	},
	rules: {
		'@typescript-eslint/explicit-function-return-type': 'error',
		'@typescript-eslint/no-use-before-define': 'off', // We're above es6, so there is no need for single-pass constraints
		'jsdoc/check-alignment': 'error',
		'jsdoc/check-examples': 'error',
		'jsdoc/check-indentation': 'error',
		'jsdoc/check-param-names': 'error',
		'jsdoc/check-syntax': 'error',
		'jsdoc/check-tag-names': 'error',
		'jsdoc/check-types': 'error',
		'jsdoc/implements-on-classes': 'error',
		'jsdoc/no-types': 'error',
		'jsdoc/no-undefined-types': 'error',
		'jsdoc/require-description': 'error',
		'jsdoc/require-hyphen-before-param-description': 'error',
		'jsdoc/require-jsdoc': 'error',
		'jsdoc/require-param': 'error',
		'jsdoc/require-param-description': 'error',
		'jsdoc/require-param-name': 'error',
		'jsdoc/require-param-type': 'error',
		'jsdoc/require-returns': 'error',
		'jsdoc/require-returns-check': 'error',
		'jsdoc/require-returns-description': 'error',
		'jsdoc/require-returns-type': 'error',
		'jsdoc/valid-types': 'error',
	},
};
