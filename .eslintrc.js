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
      parser: '@typescript-eslint/parser',
      globals: { Atomics: 'readonly', SharedArrayBuffer: 'readonly' },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-explicit-any': 1,
        // These are not an issue in TS
        'react/jsx-props-no-spreading': 0,
        'react/require-default-props': 0,
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
