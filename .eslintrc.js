module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/explicit-member-accessibility': {
      accessibility: 'no-public'
    },
    '@typescript-eslint/no-explicit-any': false,
    '@typescript-eslint/no-non-null-assertion': false,
    '@typescript-eslint/no-parameter-properties': { allows: ['private'] }
  }
};
