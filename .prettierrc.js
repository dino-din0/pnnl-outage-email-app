module.exports = {
  singleQuote: true,
  printWidth: 120,
  endOfLine: 'auto', // Add this line for the line-ending setting
  overrides: [
    {
      files: '*.scss',
      options: {
        singleQuote: false,
      },
    },
  ],
};
