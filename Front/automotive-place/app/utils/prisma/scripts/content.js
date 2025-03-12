import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  async (userId) => {
    const currentJob = await prisma.job.findUnique({ where: { userId } });

    const valid = await validJobByUserId(currentJob);
    if (!valid) return;

    await createOrUpdateJob(currentJob, userId, true, "Generating content");

    const [userActivity, allPosts, allProjects, existingUserContent] =
      await Promise.all([
        prisma.userActivity.findMany({
          where: { userId },
          include: { tags: true },
        }),
        prisma.post.findMany({
          where: { published: true },
          include: { tags: true },
        }),
        prisma.project.findMany({
          where: { isVisible: true },
          include: { tags: true },
        }),
        prisma.userContent.findMany({
          where: { userId },
        }),
      ]);

    const combinedContent = [
      ...allPosts.map((post) => ({
        id: post.id,
        type: "Post",
        tags: post.tags,
      })),
      ...allProjects.map((project) => ({
        id: project.id,
        type: "Project",
        tags: project.tags,
      })),
    ];

    const sortedContent = sortContentByUserActivity(
      combinedContent,
      userActivity
    );

    const updates = [];
    const creates = [];

    sortedContent.forEach((item, index) => {
      const existingContent = existingUserContent.find(
        (content) => content.contentId === item.id
      );

      if (existingContent) {
        // Aktualizacja prio, jeśli jest inny
        if (existingContent.prio !== index) {
          updates.push(
            prisma.userContent.update({
              where: { id: existingContent.id },
              data: { prio: index },
            })
          );
        }
      } else {
        // Dodanie nowego wpisu
        creates.push({
          userId,
          contentId: item.id,
          prio: index,
        });
      }
    });

    // Wykonanie aktualizacji i tworzenia
    await prisma.$transaction([
      ...updates,
      ...(creates.length > 0
        ? [prisma.userContent.createMany({ data: creates })]
        : []),
    ]);

    await createOrUpdateJob(currentJob, userId, false, "Content was generated");
  };

  const createOrUpdateJob = async (
    currentJob,
    userId,
    isRunning,
    lastStatus = ""
  ) => {
    const data = { isRunning, lastStatus, updatedAt: new Date() };
    currentJob
      ? await prisma.job.update({ where: { userId }, data })
      : await prisma.job.create({ data: { userId, ...data } });
  };

  const validJobByUserId = async (currentJob) => {
    if (!currentJob) return true;
    if (currentJob.isRunning) return false;
    const diff = new Date().getTime() - currentJob.updatedAt.getTime();
    return diff >= 3600000;
  };

  const sortContentByUserActivity = (content, activity) => {
    const tagCounts = activity
      .flatMap((a) => a.tags)
      .reduce((acc, tag) => {
        acc[tag.id] = (acc[tag.id] || 0) + 1;
        return acc;
      }, {});

    const scoreContent = (item) =>
      item.tags?.reduce((sum, tag) => sum + (tagCounts[tag.id] || 0), 0) || 0;

    return content.sort((a, b) => scoreContent(b) - scoreContent(a));
  };
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
