import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ICreateNotification } from "@/app/utils/types";
import { TProjectCreate } from "@/app/utils/types/project";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { ContentType, ErrorStatus } from "@/app/utils/enums";
import { createProjectSchema } from "../../zod.schmas";
import { CreateNotification } from "@/app/components/logger/NotificationHelper";
import { createProject } from "./createProject";
import { createContentForUser } from "../../helpers";

export async function POST(request: NextRequest) {
  const user = await getLoggedInUser();

  if (!user) {
    return NextResponse.json(
      { message: "YouMustBeLoggedInToUseThisFunctionality" },
      {
        status: 404,
        statusText: "Unauthorized",
      }
    );
  }

  const project: TProjectCreate = await request.json();
  let notification: ICreateNotification | null = {
    log: {
      date: new Date(),
      status: ErrorStatus.Low,
      title: "Coś poszło nie tak",
    },
    timer: 3000,
  };
  let newProject = null;

  const author = await prisma.user.findFirst();
  // TODO - change validation in all routes to zod
  const validProject = createProjectSchema.safeParse(project);

  if (!validProject.success) {
    return NextResponse.json({
      project: newProject,
      notification: CreateNotification(
        ErrorStatus.Medium,
        validProject.error.message
      ),
    });
  }

  if (author?.id) {
    if (author?.id) {
      try {
        newProject = await createProject(project, author.id);
        await createContentForUser(
          newProject.id,
          ContentType.Project,
          author.id
        );

        notification.log = {
          status: "Success",
          date: new Date(),
          title: "Projekt został dodany pomyślnie",
        };

        return NextResponse.json({ project: newProject, notification });
      } catch (error: any) {
        return NextResponse.json(
          { message: error.message || "Unknown error while creating project" },
          { status: 400 }
        );
      }
    }
  }
}
