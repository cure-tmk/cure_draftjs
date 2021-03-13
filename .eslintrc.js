const OFF = 'off'
const ERROR = 'error'
const WARN = 'warn'

// eslint-disable-next-line no-undef
module.exports = {
  plugins: ['@typescript-eslint', 'react', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'import/order': [
      ERROR,
      {
        groups: [
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        pathGroups: [
          {
            pattern: '@*/**',
            group: 'internal',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'react/jsx-uses-react': ERROR,
    'react/jsx-uses-vars': ERROR,
    'react/jsx-sort-props': WARN,
    '@typescript-eslint/ban-ts-comment': [
      WARN,
      {
        'ts-ignore': 'allow-with-description',
      },
    ],
    '@typescript-eslint/no-unused-expressions': [
      ERROR,
      {
        allowShortCircuit: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      ERROR,
      {
        argsIgnorePattern: '^_',
      },
    ],
    'no-shadow': ERROR,
  },
  overrides: [
    {
      files: ['**/*.tsx', '**/*.ts'],
      rules: {
        'react/prop-types': OFF,
        'no-shadow': OFF,
      },
    },
  ],
}
