import babelParser from '@babel/eslint-parser'
import eslintJS from '@eslint/js'
import prettierPlugin from 'eslint-plugin-prettier'
import globals from 'globals'

export default [
  eslintJS.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.node,
      parser: babelParser,
      parserOptions: {
        babelOptions: {
          babelrc: false,
          configFile: false,
          presets: ['@babel/preset-env']
        },
        ecmaVersion: 'latest',
        requireConfigFile: false,
        sourceType: 'module'
      },
      sourceType: 'module'
    },
    plugins: { prettier: prettierPlugin },
    rules: {
      'arrow-body-style': ['error', 'as-needed'],
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'no-prototype-builtins': 'off',
      'no-undef': 'error',
      'no-underscore-dangle': 'off',
      'no-unneeded-ternary': 'off',
      'no-unused-vars': 'error',
      'one-var': ['error', { const: 'never' }],
      'object-shorthand': 'error',
      'prefer-const': 'error',
      'prettier/prettier': ['error'],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'never']
    }
  }
]
