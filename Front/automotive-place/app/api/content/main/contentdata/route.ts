import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { logger } from "@/app/api/logger.config";
import prisma from "@/lib/prisma";
import { TBasicProject } from "@/app/utils/types/project";
import { ContentType } from "@/app/utils/enums";
import { TBasicPost } from "@/app/utils/types/post";

export async function GET(request: NextRequest) {
  const userData = await getLoggedInUser();

  if (!userData) {
    return NextResponse.json(
      { message: "YouMustBeLoggedInToUseThisFunctionality" },
      {
        status: 404,
        statusText: "Unauthorized",
      }
    );
  }

  const { searchParams }: any = new URL(request.url!);
  const limit = parseInt(searchParams.get("limit")) || 10;
  const page = parseInt(searchParams.get("page") || "1", 10);

  const userActivities = await prisma.userActivity.findMany({
    where: { userId: userData.user.$id },
    include: {
      tags: true,
    },
  });

  const userTags = userActivities.flatMap((activity) =>
    activity.tags.map((tag) => tag.name)
  );

  const taggedProjects = await prisma.project.findMany({
    where: {
      tags: {
        some: {
          name: {
            in: userTags,
          },
        },
      },
      media: {
        some: {},
      },
      isBlockedByAdmin: false,
      isVisible: true,
    },
    include: {
      tags: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      likes: true,
      stages: {
        orderBy: {
          stageNumber: "desc",
        },
        take: 1,
      },
      media: true,
    },
  });

  const taggedPosts = await prisma.post.findMany({
    where: {
      tags: {
        some: {
          name: {
            in: userTags,
          },
        },
      },
      isBlockedByAdmin: false,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      tags: true,
      likes: true,
      media: true,
    },
  });

  // Pobierz wszystkie projekty i posty
  const allProjects = await prisma.project.findMany({
    where: {
      media: {
        some: {},
      },
      isBlockedByAdmin: false,
      isVisible: true,
    },
    include: {
      tags: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      likes: true,
      stages: {
        orderBy: {
          stageNumber: "desc",
        },
        take: 1,
      },
      media: true,
    },
  });

  const allPosts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      tags: true,
      likes: true,
      media: true,
    },
  });

  const combinedProjects = [...taggedProjects, ...allProjects];
  const combinedPosts = [...taggedPosts, ...allPosts];

  const basicProjects: TBasicProject[] = combinedProjects.map((project) => {
    const stage = project.stages[0];

    return {
      id: project.id,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      forSell: project.forSell,
      isVisible: project.isVisible,
      name: project.name,
      carMake: project.carMake,
      carModel: project.carModel,
      description: project.description,
      isVerified: project.isVerified,
      hp: stage ? stage.hp : 0,
      nm: stage ? stage.nm : 0,
      engineStockHp: project.engineStockHp,
      engineStockNm: project.engineStockNm,
      acc_0_100: stage ? stage.acc_0_100?.toNumber() || null : null,
      acc_100_200: stage ? stage.acc_100_200?.toNumber() || null : null,
      engineNameAndCapacity: project.engineName + " " + project.engineCapacity,
      images: project.media.map((m) => m.fileLocation),
      tags: project.tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
      })),
      stageNumber: project.stages.length,
      author: {
        id: project.author.id,
        name: project.author.name,
        email: project.author.email,
      },
      likesCount: project.likes.length,
      isLikedByAuthUser: !!project.likes.find(
        (l) => l.userId === userData.user.$id
      ),
    };
  });

  const basicPosts: TBasicPost[] = combinedPosts.map((post) => ({
    content: post.content ?? "",
    id: post.id,
    imagesUrl: post.imagesUrl,
    lastUpdateAt: new Date(),
    isLikedByAuthUser: !!post.likes.find((l) => l.userId === userData.user.$id),
    likesCount: post.likes.length,
    title: post.title,
    author: {
      id: post.author?.id ?? "",
      name: post.author?.name ?? "",
      email: post.author?.email ?? "",
    },
    tags: post.tags,
  }));

  const combinedContent = [
    ...basicProjects.map((project) => ({
      type: ContentType.Project,
      data: project,
    })),
    ...basicPosts.map((post) => ({ type: ContentType.Post, data: post })),
  ];

  const shuffledContent = combinedContent.sort(() => Math.random() - 0.5);

  const paginatedContent = shuffledContent.slice(
    (page - 1) * limit,
    page * limit
  );

  const hasMore = page * limit < combinedContent.length;

  logger.info("Content was generated successfully");

  return NextResponse.json({
    data: paginatedContent,
    hasMore,
  });
}
