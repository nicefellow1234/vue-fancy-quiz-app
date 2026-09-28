const js = require('@eslint/js')
const globals = require('globals')
const vue = require('eslint-plugin-vue')

module.exports = [
  { ignores: ['dist/**', 'node_modules/**'] },
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.js', '**/*.cjs'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      sourceType: 'module',
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      globals: globals.browser,
    },
  },
]
