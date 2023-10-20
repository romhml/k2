export default {
  '*.{md,prisma,yaml,html}': ['prettier'],
  '*.{ts,vue,js}': ['eslint --fix', 'prettier --write'],
}
