export default {
  '*.{md,prisma,yaml,html,yml,json}': ['prettier'],
  '*.{ts,vue,js}': ['eslint --fix', 'prettier --write'],
}
