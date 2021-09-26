module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb', 'airbnb/hooks', 'prettier'],
  rules: {
    'no-console': ['error', { allow: ['debug', 'warn', 'error'] }],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: ['airbnb', 'airbnb-typescript', 'airbnb/hooks', 'prettier'],
      globals: { Atomics: 'readonly', SharedArrayBuffer: 'readonly' },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      rules: {
        'import/prefer-default-export': 0,
        '@typescript-eslint/no-explicit-any': 0,
      },
    },
    {
      files: ['**/test/**'],
      rules: {
        'import/no-extraneous-dependencies': 0,
      },
    },
  ],
  settings: {
    react: {
      version: '999.999.999',
    },
  },
}
