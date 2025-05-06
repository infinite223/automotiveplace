import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await generateContentForUser("66df5830003491f4e7c4");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
