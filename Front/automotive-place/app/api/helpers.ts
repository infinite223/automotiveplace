import prisma from "@/lib/prisma";
import { ContentType } from "../utils/enums";

export const createContentForUser = async (
  id: string,
  type: ContentType,
  authorId: string
) => {
  if (type === ContentType.Project) {
    const projectId = id;

    const content = await prisma.content.create({
      data: {
        projectId,
        isVerified: true,
      },
    });

    await prisma.userContent.create({
      data: {
        prio: 2,
        contentId: content.id,
        userId: authorId,
      },
    });
  }
};
