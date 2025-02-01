import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
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

  const userData = await getLoggedInUser();

  if (!userData) {
    return NextResponse.json(
      { message: "Core.YouMustBeLoggedInToUseThisFunctionality" },
      {
        status: 404,
        statusText: "Unauthorized",
      }
    );
  }

  const { searchParams }: any = new URL(request.url);
  const projectId = parseInt(searchParams.get("id"));

  const project = await prisma.project.findFirst({
    where: { id: projectId.toString() },
    include: {
      tags: true,
      author: true,
      stages: {
        orderBy: {
          stageNumber: "desc",
        },
      },
    },
  });
  // TODO - add log for user actions db -> userActivity

  // return NextResponse.json(generateRandomProjects(1)[0]);
  const projectWithImages = {
    images: projectImages,
    ...project,
  };

  return NextResponse.json(projectWithImages);
}
