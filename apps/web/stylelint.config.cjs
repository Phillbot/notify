/* eslint-env node */
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss'
  ],
  plugins: ['@stylistic/stylelint-plugin'],
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss'
    }
  ],
  rules: {
    '@stylistic/indentation': 2,
    '@stylistic/block-closing-brace-newline-after': 'always',
    '@stylistic/block-opening-brace-space-before': 'always',
    '@stylistic/declaration-block-semicolon-newline-after': 'always',
    '@stylistic/no-eol-whitespace': true,

    'rule-empty-line-before': ['always', {
      except: ['first-nested']
    }],
    'color-hex-length': 'long',
    'block-no-empty': true,
    'declaration-block-no-duplicate-properties': true
  }
};
