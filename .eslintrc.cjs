module.exports = {
  root: true,
  env: {
    'browser': true,
    'es2020': true,
    'node': 'current',
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest', 'react-refresh'],
  rules: { 'react-hooks/exhaustive-deps': 0 },
}
