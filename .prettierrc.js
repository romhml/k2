module.exports = {
  plugins: [
    "prettier-plugin-prisma",
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
