module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    // node 16 supports es:2022 except 'Class static initialization blocks' and Error.cause (we use these rarely)
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': [
      'error',
      'unix',
    ],
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
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
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-shadow': ['warn'],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          multiline: true,
          minProperties: 1,
        },
        ObjectPattern: {
          multiline: true,
        },
        ImportDeclaration: {
          multiline: true,
        },
        ExportDeclaration: {
          minProperties: 1,
          multiline: true,
        },
      },
    ],
    'array-bracket-newline': [
      'error',
      {
        minItems: 2,
        multiline: true,
      },
    ],
    'array-element-newline': [
      'error',
      {
        minItems: 2,
        multiline: true,
      },
    ],
    'object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: false,
      },
    ],
    'no-underscore-dangle': [
      'error',
      {
        allow: [
          '_source',
          '_scroll_id',
        ],
      },
    ],
    'import/no-cycle': [
      'error',
      {
        maxDepth: 10,
        ignoreExternal: true,
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        peerDependencies: true,
      },
    ],
  },
};
