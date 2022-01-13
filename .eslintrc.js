/* Use the variable to enable more strict checking */
const isStrictCheck = process.env.ESLINT_STRICT === '1';

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['import', '@typescript-eslint/eslint-plugin'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.js'],
    },
    'import/internal-regex': '^@/',
    'import/resolver': {
      typescript: {
        /*
         * always try to resolve types under `<root>/@types` directory
         * even it doesn't contain any source code, like `@types/unist`
         */
        alwaysTryTypes: true,
      },
    },
  },
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'import/prefer-default-export': 'off',
    // there are a lot of places where we use cycle imports
    'import/no-cycle': 'off',
    // allow to user for-...
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',

    /* The base eslint rules have errors here, so we switch them to ts versions */
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      isStrictCheck ? 'error' : 'warn',
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [isStrictCheck ? 'error' : 'warn'],
    'no-shadow': 'off', // replaced by ts-eslint rule below
    '@typescript-eslint/no-shadow': 'error',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',

    'lines-between-class-members': [
      isStrictCheck ? 'error' : 'warn',
      'always',
      { exceptAfterSingleLine: true },
    ],

    /* not comfortable to use it in process of development */
    'import/no-useless-path-segments': isStrictCheck ? 'error' : 'off',
    'no-console': isStrictCheck ? 'error' : 'off',
    'prettier/prettier': isStrictCheck ? 'error' : 'off',
    'linebreak-style': isStrictCheck ? 'error' : 'off',
    'comma-dangle': isStrictCheck ? 'error' : 'off',
    'object-curly-spacing': isStrictCheck ? 'error' : 'warn',
    'prefer-template': isStrictCheck ? 'error' : 'warn',
    curly: isStrictCheck ? 'error' : 'off',
    quotes: isStrictCheck ? 'error' : 'off',
    'eol-last': isStrictCheck ? 'error' : 'off',
    'prefer-const': isStrictCheck ? 'error' : 'warn',
    'prefer-destructuring': isStrictCheck ? 'error' : 'warn',
    'no-debugger': isStrictCheck ? 'error' : 'warn',
    'no-unreachable': isStrictCheck ? 'error' : 'warn',
    'arrow-body-style': [isStrictCheck ? 'error' : 'off', 'as-needed'],
    'import/first': isStrictCheck ? 'error' : 'warn',
    'import/newline-after-import': isStrictCheck ? 'error' : 'off',
    'import/order': [
      isStrictCheck ? 'error' : 'off',
      {
        pathGroups: [{ pattern: '@/**', group: 'internal' }],
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'never',
        alphabetize: { order: 'asc', caseInsensitive: false },
      },
    ],
  },
};
