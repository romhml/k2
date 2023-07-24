export default {
  '*.prisma': ['pnpm dotenv -e ../../.env -- prisma validate'],
};
