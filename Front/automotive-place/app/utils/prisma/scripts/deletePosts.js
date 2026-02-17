import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function deletePosts() {
  await prisma.post.deleteMany({});
  console.log("All posts have been deleted");
}

deletePosts()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
