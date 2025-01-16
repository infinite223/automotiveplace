import { NextRequest, NextResponse } from "next/server";
import { generateRandomContent } from "@/app/utils/data/contentData";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { logger } from "@/app/api/logger.config";
import prisma from "@/lib/prisma";
import { TBasicProject } from "@/app/utils/types/project";
import { ContentType } from "@/app/utils/enums";

const projectImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS68Gy62kKm-z60Pe_y32-kfkuaEmprwzvfKXfM_zhLiiC4ulIna5DlScrbubsjMtfzA9w&usqp=CAU";
const projectImage2 =
  "https://media.drive.com.au/obj/tx_q:70,rs:auto:1200:675:1/driveau/upload/cms/uploads/bi36meqa62rhbghgdrkh";

const projectImage3 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAForxurppxANqMjH2I1CjPPg79vtTEN71FQ&s";

const projectImage4 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSdZIVym1fnqh7TWirmnbWEhUy0oJgEsQmCQ&s";

const projectImages = [
  projectImage,
  projectImage2,
  projectImage3,
  projectImage4,
];

export async function GET(request: NextRequest, response: NextResponse) {
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

  // TODO - dokończyć implementecje
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
      author: true,
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

  const basicProjects: TBasicProject[] = sortedProjects.map((project) => ({
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
    hp: project.engineStockHp, // change to last stage hp
    nm: project.engineStockNm,
    acc_0_100: 5.5,
    acc_100_200: 10.2,
    engineNameAndCapacity: project.engineName + " " + project.engineCapacity,
    images: projectImages, // change to images from db
    tags: project.tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
    })),
    author: {
      id: project.author.id,
      name: project.author.name,
      email: project.author.email,
    },
  }));

  console.log(basicProjects, "personalizedPosts");

  // logic for getting content data...

  // Check if more data exists
  const hasMore = false;

  let responseResult: any;

  logger.info("Content was generated successfully ");

  return NextResponse.json({
    data: [{ type: ContentType.Project, data: basicProjects[0] }],
    hasMore,
  });

  // return NextResponse.json({
  //   data: generateRandomContent(10),
  //   hasMore,
  // });
}
