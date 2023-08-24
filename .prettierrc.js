module.exports = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports",
  ],
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "^#(.*)$",
    "^@k2/(.*)$",
    "^@/(.*)$",
    "^~/(.*)$",
    "^[./]",
  ],
};
