const config = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'next/core-web-vitals',
    'plugin:tailwindcss/recommended',
  ],
  env: {
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  root: true,
  settings: {
    tailwindcss: {
      callees: ['cn'],
      whitelist: [],
    },
    next: {
      rootDir: './dashboard',
    },
  },
  rules: {
    curly: 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    /**
     * Has to be disabled in favor of @typescript-eslint/no-use-before-define
     */
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    '@typescript-eslint/no-shadow': 'error',
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],
    'react/self-closing-comp': 'warn',
    'react/function-component-definition': 'error',
    'react/display-name': 'off',
  },
}

module.exports = config
