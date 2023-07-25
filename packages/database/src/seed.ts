import { prisma } from ".";
import { postFactory } from "./factories";

(async () => {
  try {
    await Promise.all(
      [...Array(1000)].map(async () => {
        return await postFactory();
      }),
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
