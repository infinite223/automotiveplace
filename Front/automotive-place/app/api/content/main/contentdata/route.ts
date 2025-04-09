import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { logger } from "@/app/api/logger.config";
import prisma from "@/lib/prisma";
import { ContentType } from "@/app/utils/enums";
import redis from "@/lib/redis";

async function getUserSeenContentIds(userId: string) {
  const redisKey = `user:seenContent:${userId}`;
  const seenContentIds = await redis.sMembers(redisKey);
  return seenContentIds;
}

export async function GET(request: NextRequest) {
  const userData = await getLoggedInUser();

  if (!userData) {
    return NextResponse.json(
      { message: "YouMustBeLoggedInToUseThisFunctionality" },
      { status: 404, statusText: "Unauthorized" }
    );
  }

  const { searchParams }: any = new URL(request.url!);
  const limit = parseInt(searchParams.get("limit")) || 10;
  const page = parseInt(searchParams.get("page") || 0, 10);
  const seenPage = parseInt(searchParams.get("seenPage") || 0, 10);

  try {
    let content;
    const seenContentIds = await getUserSeenContentIds(userData.user.$id);

    const userContent = await prisma.userContent.findMany({
      take: limit,
      skip: limit * page,
      where: {
        userId: userData.user.$id,
        content: {
          id: {
            notIn: seenContentIds,
          },
        },
      },
      include: {
        content: {
          include: {
            post: {
              include: {
                author: { select: { id: true, name: true, email: true } },
                tagAssignments: { include: { tag: true } },
                userActivity: true,
                media: true,
              },
            },
            project: {
              include: {
                author: { select: { id: true, name: true, email: true } },
                tagAssignments: { include: { tag: true } },
                userActivity: true,
                stages: {
                  orderBy: { stageNumber: "desc" },
                  take: 1,
                },
                media: true,
              },
            },
          },
        },
      },
      orderBy: { prio: "asc" },
    });

    content = userContent.map((uc) => uc.content);

    if (userContent.length < 10) {
      const take = limit - userContent.length;
      const seenContent = await prisma.userContent.findMany({
        take,
        skip: take * seenPage,
        where: {
          userId: userData.user.$id,
          content: {
            id: {
              in: seenContentIds,
            },
          },
        },
        include: {
          content: {
            include: {
              post: {
                include: {
                  author: { select: { id: true, name: true, email: true } },
                  tagAssignments: { include: { tag: true } },
                  userActivity: true,
                  media: true,
                },
              },
              project: {
                include: {
                  author: { select: { id: true, name: true, email: true } },
                  tagAssignments: { include: { tag: true } },
                  userActivity: true,
                  stages: {
                    orderBy: { stageNumber: "desc" },
                    take: 1,
                  },
                  media: true,
                },
              },
            },
          },
        },
        orderBy: { prio: "asc" },
      });

      const seenUserContent = seenContent.map((uc) => uc.content);
      content = [...content, ...seenUserContent];
    }

    if (content.length === 0) {
      return NextResponse.json({ data: [], hasMore: false });
    }

    const combinedContent = content
      .map((c) => {
        if (c.project) {
          const project = c.project;
          const stage = project.stages[0];

          return {
            type: ContentType.Project,
            data: {
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
              engineNameAndCapacity:
                project.engineName + " " + project.engineCapacity,
              images: project.media.map((m) => m.fileLocation),
              tags: project.tagAssignments.map((i) => ({
                id: i.id,
                name: i.tag.name,
              })),
              stageNumber: project.stages.length,
              author: {
                id: project.author.id,
                name: project.author.name,
                email: project.author.email,
              },
              likesCount: project.userActivity.length,
              isLikedByAuthUser: !!project.userActivity.find(
                (l) =>
                  l.userId === userData.user.$id && l.activityType === "LIKE"
              ),
            },
          };
        } else if (c.post) {
          const post = c.post;
          console.log(post, "post");
          return {
            type: ContentType.Post,
            data: {
              content: post.content ?? "",
              id: post.id,
              imagesUrl: post.imagesUrl,
              lastUpdateAt: new Date(),
              isLikedByAuthUser: !!post.userActivity.find(
                (l) =>
                  l.userId === userData.user.$id && l.activityType === "LIKE"
              ),
              likesCount: post.userActivity.length,
              title: post.title,
              author: {
                id: post.author?.id ?? "",
                name: post.author?.name ?? "",
                email: post.author?.email ?? "",
              },
              tags: post.tagAssignments ?? [],
            },
          };
        }

        return null;
      })
      .filter(Boolean);

    const hasMore = page * limit < combinedContent.length;

    logger.info("Content was generated successfully");
    return NextResponse.json({
      data: combinedContent,
      hasMore,
    });
  } catch (error) {
    console.error("Error fetching user content:", error);
    return NextResponse.json(
      { message: "Error fetching content" },
      { status: 500 }
    );
  }
}
