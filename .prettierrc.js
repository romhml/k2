module.exports = {
  plugins: [
    'prettier-plugin-tailwindcss',
    '@trivago/prettier-plugin-sort-imports',
  ],
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^#(.*)$',
    '^@k2/(.*)$',
    '^@/(.*)$',
    '^~/(.*)$',
    '^[./]',
  ],
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  singleAttributePerLine: true,
  trailingComma: 'es5',
};
