module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:prettier/recommended', // eslint의 포매팅 기능을 prettier로 사용함. 항상 마지막에 세팅 되어야 함. - eslint-config-prettier
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'always'],
    'no-unused-vars': ['off'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
