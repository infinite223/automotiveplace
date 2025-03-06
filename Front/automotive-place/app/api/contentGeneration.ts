import prisma from "@/lib/prisma";
import { Job, Post, Project, UserActivity } from "@prisma/client";

export const generateContentForUser = async (userId: string) => {
  const currentJob = await prisma.job.findUnique({ where: { userId } });

  const valid = await validJobByUserId(currentJob);

  if (!valid) return;

  createOrUpdateJob(currentJob, userId, true, "Generating content");

  const userActivity = await prisma.userActivity.findMany({
    where: { userId },
    include: { tags: true },
  });

  // Pobieramy wszystkie posty i projekty
  const allPosts = await prisma.post.findMany({ where: { published: true } });
  const allProjects = await prisma.project.findMany({
    where: { isVisible: true },
  });

  // Sortujemy na podstawie aktywności użytkownika
  const sortedContent = sortContentByUserActivity(
    allPosts,
    allProjects,
    userActivity
  );

  // Sprawdzamy, czy użytkownik ma już content
  let userContent = await prisma.content.findMany({
    where: { users: { some: { userId } } },
  });

  if (userContent.length > 0) {
    // Jeśli istnieje, dodajemy brakujące posty/projekty i sortujemy ponownie
    const newContent = sortedContent.filter(
      (item) =>
        !userContent.some(
          (uc) => uc.postId === item.id || uc.projectId === item.id
        )
    );

    await prisma.userContent.createMany({
      data: newContent.map((item) => ({
        userId,
        contentId: item.id,
      })),
    });
  } else {
    // Tworzymy nowy content
    await prisma.content.createMany({
      data: sortedContent.map((item) => ({
        postId: "title" in item ? item.id : null,
        projectId: "carMake" in item ? item.id : null,
      })),
    });
  }

  // Generate content for user
  // doppasuj content dla usera poprzez tabele userActivity, czyli przez to co lajkuje, to co ogląda itp, czyli
  // trzeba pobrać dane z tabeli userActivity, a potem na podstawie tego wygenerować content z projects i posts
  // ilośc contentu ma być maksymalna, czyli w contetn mają się znaleźć wszystkie posty i projekty które istnieją w bazie kednak mają one być posortowane
  // w taki sposób aby były jak najbardziej dopasowane do usera ------ jeeli konent juz istnieje to tylko dodaj do niego brakujące posty,
  // projekty które mogły dojść w czasie a następnie posortuj według userActivity

  createOrUpdateJob(currentJob, userId, false, "content was generated");
};

const createOrUpdateJob = async (
  currentJob: Job | null,
  userId: string,
  isRunning: boolean,
  lastStatus: string = ""
) => {
  if (currentJob) {
    await prisma.job.update({
      where: { userId: currentJob.userId },
      data: {
        isRunning,
        lastStatus,
      },
    });
  } else {
    await prisma.job.create({
      data: {
        userId,
        isRunning,
        lastStatus,
      },
    });
  }
};

const validJobByUserId = async (currentJob: Job | null) => {
  if (!currentJob) return true;

  if (currentJob?.isRunning) return false;

  if (currentJob?.updatedAt) {
    const diff = new Date().getTime() - currentJob.updatedAt.getTime();
    if (diff < 3600000) return false;
  }

  return true;
};

const sortContentByUserActivity = (
  posts: Post[],
  projects: Project[],
  activity: any[]
) => {
  const tagCounts = activity
    .flatMap((a) => a.tags)
    .reduce((acc, tag) => {
      acc[tag.id] = (acc[tag.id] || 0) + 1;
      return acc;
    }, {});

  const scoreContent = (item: any) => {
    const tagMatches =
      item.tags?.reduce(
        (sum: any, tag: any) => sum + (tagCounts[tag.id] || 0),
        0
      ) || 0;
    return tagMatches;
  };

  return [...posts, ...projects].sort(
    (a, b) => scoreContent(b) - scoreContent(a)
  );
};
