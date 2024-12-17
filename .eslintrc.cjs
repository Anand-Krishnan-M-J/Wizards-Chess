module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'next/core-web-vitals',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', 'import', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/no-unknown-property': [
      'error',
      {
        ignore: [
          'material',
          'geometry',
          'position',
          'intensity',
          'args',
          'castShadow',
          'attach',
          'transparent',
          'roughness',
          'metalness',
          'vertexShader',
          'fragmentShader',
          'uniforms',
        ],
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['internal'],
          ['parent', 'sibling'],
          ['index'],
        ],
        pathGroups: [
          {
            pattern: '**/*.scss',
            group: 'unknown',
            position: 'after', // Ensure SCSS comes last
          },
        ],
        pathGroupsExcludedImportTypes: ['unknown'], // Ensure SCSS is excluded from other sorting
        'newlines-between': 'never',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_', // Ignore unused function arguments starting with an underscore
        varsIgnorePattern: '^_', // Ignore unused variables starting with an underscore
        ignoreRestSiblings: true, // Ignore unused exports
        caughtErrors: 'all', // Catch errors for unused variables
      },
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_', // Ignore unused function arguments starting with an underscore
        varsIgnorePattern: '^_', // Ignore unused variables starting with an underscore
        ignoreRestSiblings: true, // Ignore unused exports
      },
    ],
  },
};
