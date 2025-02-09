import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { logger } from "@/app/api/logger.config";
import prisma from "@/lib/prisma";
import { TBasicProject } from "@/app/utils/types/project";
import { ContentType } from "@/app/utils/enums";
import { TBasicPost } from "@/app/utils/types/post";

const projectImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS68Gy62kKm-z60Pe_y32-kfkuaEmprwzvfKXfM_zhLiiC4ulIna5DlScrbubsjMtfzA9w&usqp=CAU";
const projectImage2 =
  "https://media.drive.com.au/obj/tx_q:70,rs:auto:1200:675:1/driveau/upload/cms/uploads/bi36meqa62rhbghgdrkh";

const projectImage3 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAForxurppxANqMjH2I1CjPPg79vtTEN71FQ&s";

const projectImage4 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSdZIVym1fnqh7TWirmnbWEhUy0oJgEsQmCQ&s";

const projectImage5 =
  "https://cloud.appwrite.io/v1/storage/buckets/671a638d00369a634162/files/67a12ab00028f1f22d8e/view?project=66b72b780006144f8424&mode=admin";
const projectImages = [
  projectImage,
  projectImage2,
  projectImage3,
  projectImage4,
  projectImage5,
];

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

  const userInterests = await prisma.userActivity.groupBy({
    by: ["entityType"],
    where: { userId: userData.user.$id },
    _count: {
      entityId: true,
    },
    orderBy: {
      _count: {
        entityId: "desc",
      },
    },
  });

  const allProjects = await prisma.project.findMany({
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

  // Sort projects based on matching tags
  const sortedProjects = allProjects.sort((a, b) => {
    const aMatches = a.tags.filter((tag) =>
      userInterests.some((interest) => interest.entityType === tag.name)
    ).length;
    const bMatches = b.tags.filter((tag) =>
      userInterests.some((interest) => interest.entityType === tag.name)
    ).length;
    return bMatches - aMatches;
  });

  const basicProjects: TBasicProject[] = sortedProjects.map((project) => {
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
      images: projectImages, // change to images from db
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

  const basicPosts: TBasicPost[] = allPosts.map((post) => ({
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
