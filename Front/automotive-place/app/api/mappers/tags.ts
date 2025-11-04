import { TProject } from "@/app/utils/types/project";
import { ProjectWithIncludes } from "./project";
import { TTagCreate } from "@/app/utils/types/tag";

export function mapTags(
  tagAssignments: ProjectWithIncludes["tagAssignments"]
): TProject["tags"] {
  return tagAssignments.map((tagAssign) => ({
    id: tagAssign.id,
    name: tagAssign.tag.name,
  }));
}

export function mapTagsToPrisma(tags: TTagCreate[], authorId: string) {
  if (!tags || tags.length === 0) return undefined;

  return {
    create: tags.map((t) => ({
      tag: {
        create: {
          name: t.name,
          authorId: authorId,
          isBlockedByAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    })),
  };
}
