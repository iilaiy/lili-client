module.exports = {
  tabWidth: 2,
  jsxSingleQuote: true,
  // jsxBracketSameLine: true,           /* [warn] jsxBracketSameLine is deprecated. */
  printWidth: 100,
  singleQuote: true,
  semi: false,
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
  ],
  arrowParens: 'always',
}
