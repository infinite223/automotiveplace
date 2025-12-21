import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ICreateNotification } from "@/app/utils/types";
import { TProjectCreate } from "@/app/utils/types/project";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { ContentType, Status } from "@/app/utils/enums";
import { createProjectSchema } from "../../zod.schmas";
import { CreateNotification } from "@/app/components/logger/NotificationHelper";
import { createProject } from "./createProject";
import { createContentForUser } from "../../helpers";

export async function POST(request: NextRequest) {
  const user = await getLoggedInUser();

  if (!user) {
    return NextResponse.json(
      { message: "YouMustBeLoggedInToUseThisFunctionality" },
      { status: 404 }
    );
  }

  const project: TProjectCreate = await request.json();

  const validProject = createProjectSchema.safeParse(project);
  if (!validProject.success) {
    return NextResponse.json({
      project: null,
      notification: CreateNotification(
        Status.Medium,
        validProject.error.message
      ),
    });
  }

  const author = await prisma.user.findFirst();

  if (!author?.id) {
    return NextResponse.json({ message: "Author not found" }, { status: 404 });
  }

  try {
    const newProject = await createProject(project, author.id);

    await createContentForUser(newProject.id, ContentType.Project, author.id);

    return NextResponse.json({
      project: newProject,
      notification: {
        log: {
          status: Status.Success,
          date: new Date(),
          title: "Projekt został dodany pomyślnie",
        },
        timer: 3000,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message ?? "Unknown error" },
      { status: 400 }
    );
  }
}
