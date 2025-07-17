import { TProject } from "@/app/utils/types/project";
import { ProjectWithIncludes } from "./project";

export function mapTags(
  tagAssignments: ProjectWithIncludes["tagAssignments"]
): TProject["tags"] {
  return tagAssignments.map((tagAssign) => ({
    id: tagAssign.id,
    name: tagAssign.tag.name,
  }));
}
