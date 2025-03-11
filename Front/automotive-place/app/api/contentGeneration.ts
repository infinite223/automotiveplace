import prisma from "@/lib/prisma";
import {
  Job,
  Post,
  Project,
  UserActivity,
  Tag,
  UserContent,
} from "@prisma/client";
import { TBasicPost } from "../utils/types/post";
import { TBasicProject } from "../utils/types/project";
import { TBasicTag } from "../utils/types/tag";

type ContentItem = {
  id: string; // id projektu lub posta
  type: "Post" | "Project"; // tylko te dwie wartości
  data: TBasicPost | TBasicProject; // dane posta lub projektu
  tags: TBasicTag[]; // tagi o prostszym typie
};

export const generateContentForUser = async (userId: string) => {
  const currentJob = await prisma.job.findUnique({ where: { userId } });

  const valid = await validJobByUserId(currentJob);
  if (!valid) return;

  await createOrUpdateJob(currentJob, userId, true, "Generating content");

  const [userActivity, allPosts, allProjects, userContent] = await Promise.all([
    prisma.userActivity.findMany({
      where: { userId },
      include: { tags: true }, // dodano include, aby pobrać tagi
    }),
    prisma.post.findMany({
      where: { published: true },
      select: { id: true, tags: true },
    }),
    prisma.project.findMany({
      where: { isVisible: true },
      select: { id: true, tags: true },
    }),
    prisma.content.findMany({
      where: { users: { some: { userId } } },
    }),
  ]);

  const combinedContent: any[] = [
    ...allPosts.map((post) => ({ ...post, type: "post" as const })),
    ...allProjects.map((project) => ({ ...project, type: "project" as const })),
  ];

  const sortedContent = sortContentByUserActivity(
    combinedContent,
    userActivity
  );

  const existingContentIds = new Set(
    userContent.map((uc) => uc.postId || uc.projectId)
  );
  const newContent = sortedContent.filter(
    (item) => !existingContentIds.has(item.id)
  );

  await prisma.$transaction(async (tx) => {
    if (newContent.length > 0) {
      await tx.userContent.createMany({
        data: newContent.map((item) => ({
          userId,
          contentId: item.id,
        })),
      });
    }

    if (userContent.length === 0 && sortedContent.length > 0) {
      await tx.content.createMany({
        data: sortedContent.map((item) => ({
          postId: item.type === "Post" ? item.id : null,
          projectId: item.type === "Project" ? item.id : null,
        })),
      });
    }
  });

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
  content: ContentItem[], // Zaktualizowany typ z data, id, tags, type
  activity: (UserActivity & { tags: Tag[] })[] // Aktywność użytkownika z tagami
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
