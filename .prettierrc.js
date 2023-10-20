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
  semi: false,
  singleQuote: true,
  singleAttributePerLine: true,
}
