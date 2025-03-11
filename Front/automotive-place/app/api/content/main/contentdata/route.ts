import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { logger } from "@/app/api/logger.config";
import prisma from "@/lib/prisma";
import { ContentType } from "@/app/utils/enums";
import { TBasicProject } from "@/app/utils/types/project";
import { TBasicPost } from "@/app/utils/types/post";
import { sortContentByUserActivity } from "@/app/api/contentGeneration";

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
  const page = parseInt(searchParams.get("page") || "1", 10);

  try {
    const userContent = await prisma.userContent.findMany({
      where: { userId: userData.user.$id },
      select: { contentId: true },
    });

    const contentIds = userContent.map((uc) => uc.contentId);

    if (contentIds.length === 0) {
      return NextResponse.json({ data: [], hasMore: false });
    }

    const content = await prisma.content.findMany({
      where: { id: { in: contentIds } },
      include: {
        post: {
          include: {
            author: { select: { id: true, name: true, email: true } },
            tags: true,
            likes: true,
            media: true,
          },
        },
        project: {
          include: {
            author: { select: { id: true, name: true, email: true } },
            tags: true,
            likes: true,
            stages: {
              orderBy: { stageNumber: "desc" },
              take: 1,
            },
            media: true,
          },
        },
      },
    });

    // Pobierz aktywność użytkownika
    const userActivity = await prisma.userActivity.findMany({
      where: { userId: userData.user.$id },
      include: {
        tags: true, // Dołącz tagi aktywności użytkownika
      },
    });

    // Przekształć dane w odpowiednią strukturę do sortowania
    const basicProjects: TBasicProject[] = content
      .filter((c) => c.project)
      .map(({ project }) => {
        const stage = project!.stages[0];

        return {
          id: project!.id,
          createdAt: project!.createdAt,
          updatedAt: project!.updatedAt,
          forSell: project!.forSell,
          isVisible: project!.isVisible,
          name: project!.name,
          carMake: project!.carMake,
          carModel: project!.carModel,
          description: project!.description,
          isVerified: project!.isVerified,
          hp: stage ? stage.hp : 0,
          nm: stage ? stage.nm : 0,
          engineStockHp: project!.engineStockHp,
          engineStockNm: project!.engineStockNm,
          acc_0_100: stage ? stage.acc_0_100?.toNumber() || null : null,
          acc_100_200: stage ? stage.acc_100_200?.toNumber() || null : null,
          engineNameAndCapacity:
            project!.engineName + " " + project!.engineCapacity,
          images: project!.media.map((m) => m.fileLocation),
          tags: project!.tags.map((tag) => ({
            id: tag.id,
            name: tag.name,
          })),
          stageNumber: project!.stages.length,
          author: {
            id: project!.author.id,
            name: project!.author.name,
            email: project!.author.email,
          },
          likesCount: project!.likes.length,
          isLikedByAuthUser: !!project!.likes.find(
            (l) => l.userId === userData.user.$id
          ),
        };
      });

    const basicPosts: TBasicPost[] = content
      .filter((c) => c.post)
      .map(({ post }) => ({
        content: post!.content ?? "",
        id: post!.id,
        imagesUrl: post!.imagesUrl,
        lastUpdateAt: new Date(),
        isLikedByAuthUser: !!post!.likes.find(
          (l) => l.userId === userData.user.$id
        ),
        likesCount: post!.likes.length,
        title: post!.title,
        author: {
          id: post!.author?.id ?? "",
          name: post!.author?.name ?? "",
          email: post!.author?.email ?? "",
        },
        tags: post!.tags,
      }));

    // Połącz projekty i posty
    const combinedContent = [
      ...basicProjects.map((project) => ({
        id: project.id,
        type: "Project" as const, // Upewnij się, że jest to "project"
        data: project,
        tags: project.tags,
      })),
      ...basicPosts.map((post) => ({
        id: post.id,
        type: "Post" as const, // Upewnij się, że jest to "post"
        data: post,
        tags: post.tags,
      })),
    ];

    // Sortuj treści na podstawie aktywności użytkownika
    const sortedContent = sortContentByUserActivity(
      combinedContent,
      userActivity
    );
    console.log(userActivity, "userActivity");
    // Paginowanie
    const shuffledContent = sortedContent.slice(
      (page - 1) * limit,
      page * limit
    );

    const hasMore = page * limit < sortedContent.length;

    logger.info("Content was generated successfully");

    return NextResponse.json({
      data: shuffledContent,
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
