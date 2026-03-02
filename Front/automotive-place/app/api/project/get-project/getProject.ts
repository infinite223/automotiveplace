import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type TGetProject = Prisma.PromiseReturnType<typeof getProject>;

export const getProject = async (projectId: string) => {
  return await prisma.project.findFirst({
    where: { id: projectId.toString() },
    include: {
      tagAssignments: { include: { tag: true } },
      author: true,
      media: {
        select: { fileLocation: true },
        where: {
          AND: [
            { fileName: { not: { contains: "AMP_dyno" } } },
            { fileName: { not: { contains: "AMP_visual_mods" } } },
          ],
        },
      },
      history: {
        include: {
          company: {
            select: {
              id: true,
              name: true,
              imagesUrl: true,
            },
          },
        },
        orderBy: {
          date: "desc",
        },
      },
      stages: {
        include: { carItems: true },
        orderBy: {
          stageNumber: "desc",
        },
      },
      location: {
        select: {
          name: true,
          description: true,
          lat: true,
          lng: true,
        } as const,
      } as const,
      userActivity: {
        select: { activityType: true, userId: true },
      },
      visualModification: {
        where: { isBlockedByAdmin: false },
        include: { media: { select: { fileLocation: true } } },
      },
    },
  });
};
