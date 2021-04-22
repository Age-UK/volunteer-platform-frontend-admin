module.exports = {
  root: true,
  plugins: ['jsdoc'],
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/prettier',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: false,
      },
    ],
  },
  overrides: [
    {
      // Enforce JSDoc for Services
      files: ['src/services/**/*.js'],
      rules: {
        'jsdoc/check-access': 2,
        'jsdoc/check-alignment': 2,
        'jsdoc/check-param-names': 2,
        'jsdoc/check-property-names': 2,
        'jsdoc/check-tag-names': 2,
        'jsdoc/check-types': 2,
        'jsdoc/check-values': 2,
        'jsdoc/empty-tags': 2,
        'jsdoc/implements-on-classes': 2,
        'jsdoc/newline-after-description': 2,
        'jsdoc/no-undefined-types': 2,
        'jsdoc/require-jsdoc': [
          2,
          {
            require: {
              FunctionDeclaration: true,
              MethodDefinition: true,
              ClassDeclaration: true,
              ArrowFunctionExpression: true,
              FunctionExpression: true,
            },
          },
        ],
        'jsdoc/require-param': 2,
        'jsdoc/require-param-description': 2,
        'jsdoc/require-param-name': 2,
        'jsdoc/require-param-type': 2,
        'jsdoc/require-property': 2,
        'jsdoc/require-property-description': 2,
        'jsdoc/require-property-name': 2,
        'jsdoc/require-property-type': 2,
        'jsdoc/require-returns': 2,
        'jsdoc/require-returns-check': 2,
        'jsdoc/require-returns-description': 2,
        'jsdoc/require-returns-type': 2,
        'jsdoc/require-yields': 2,
        'jsdoc/require-yields-check': 2,
        'jsdoc/valid-types': 2,
        'jsdoc/require-hyphen-before-param-description': 2,
        'jsdoc/require-file-overview': 2,
        'jsdoc/check-indentation': 2,
        'jsdoc/check-line-alignment': 2,
      },
    },
  ],
};
