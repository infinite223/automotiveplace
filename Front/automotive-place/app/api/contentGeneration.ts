import prisma from "@/lib/prisma";
import { Job, UserActivity, Tag } from "@prisma/client";
import { TBasicTag } from "../utils/types/tag";

type ContentItem = {
  id: string;
  type: "Post" | "Project";
  tags: TBasicTag[];
};

export const generateContentForUser = async (userId: string) => {
  const currentJob = await prisma.job.findUnique({ where: { userId } });

  const valid = await validJobByUserId(currentJob);
  if (!valid) return;

  await createOrUpdateJob(currentJob, userId, true, "Generating content");

  const [userActivity, allPosts, allProjects, existingUserContent] =
    await Promise.all([
      prisma.userActivity.findMany({
        where: { userId },
        include: { tagAssignments: { include: { tag: true } } },
      }),
      prisma.post.findMany({
        where: { published: true },
        include: { tagAssignments: { include: { tag: true } } },
      }),
      prisma.project.findMany({
        where: { isVisible: true },
        include: { tagAssignments: { include: { tag: true } } },
      }),
      prisma.userContent.findMany({
        where: { userId },
        include: {
          content: {
            include: {
              project: { select: { id: true } },
              post: { select: { id: true } },
            },
          },
        },
      }),
    ]);
  // TODO - refactor this
  const combinedContent: ContentItem[] = [
    ...allPosts.map((post) => ({
      id: post.id,
      type: "Post" as const,
      tags: post.tagAssignments.map((t) => t.tag),
    })),
    ...allProjects.map((project) => ({
      id: project.id,
      type: "Project" as const,
      tags: project.tagAssignments.map((t) => t.tag),
    })),
  ];

  const transformedUserActivity = userActivity.map((activity) => ({
    ...activity,
    tags: activity.tagAssignments.map((t) => t.tag),
  }));

  const sortedContent = sortContentByUserActivity(
    combinedContent,
    transformedUserActivity
  );

  const updates: any = [];
  const creates: any = [];
  const missingContents: any = [];

  console.log(sortedContent, "sortedContent");
  sortedContent.forEach((item, index) => {
    const existingContent = existingUserContent.find(
      (content) =>
        content.content.project?.id === item.id ||
        content.content.post?.id === item.id
    );

    console.log(existingContent, "existingContent");
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
      // trzeba oprócz userContent dodać jeszcze content
      if (item.type === "Post") {
        missingContents.push({
          id: item.id,
          postId: item.id,
        });
      }
      if (item.type === "Project") {
        missingContents.push({
          id: item.id,
          projectId: item.id,
        });
      }

      creates.push({
        contentId: item.id,
        prio: index,
        userId,
      });
    }
  });

  // Wykonanie aktualizacji i tworzenia

  console.log(updates, creates, "c");
  // Wyszukiwanie brakujących Content do utworzenia

  await prisma.$transaction([
    // Najpierw utwórz brakujące rekordy Content
    prisma.content.createMany({
      data: missingContents,
      skipDuplicates: true, // Pomija duplikaty, jeśli Content już istnieje
    }),

    // Następnie dodaj UserContent
    prisma.userContent.createMany({
      data: creates,
    }),

    // Wykonaj aktualizacje istniejących UserContent
    ...updates,
  ]);

  await createOrUpdateJob(currentJob, userId, false, "Content was generated");
};

const createOrUpdateJob = async (
  currentJob: Job | null,
  userId: string,
  isRunning: boolean,
  lastStatus: string = ""
) => {
  const data = { isRunning, lastStatus, updatedAt: new Date() };
  currentJob
    ? await prisma.job.update({ where: { userId }, data })
    : await prisma.job.create({ data: { userId, ...data } });
};

const validJobByUserId = async (currentJob: Job | null) => {
  if (!currentJob) return true;
  if (currentJob.isRunning) return false;
  const diff = new Date().getTime() - currentJob.updatedAt.getTime();
  return diff >= 3600000;
};

export const sortContentByUserActivity = (
  content: ContentItem[],
  activity: (UserActivity & { tags: Tag[] })[]
) => {
  const tagCounts = activity
    .flatMap((a) => a.tags)
    .reduce(
      (acc, tag) => {
        acc[tag.id] = (acc[tag.id] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

  const scoreContent = (item: ContentItem) =>
    item.tags?.reduce((sum, tag) => sum + (tagCounts[tag.id] || 0), 0) || 0;

  return content.sort((a, b) => scoreContent(b) - scoreContent(a));
};
