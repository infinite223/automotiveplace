import { TTagCreate } from "../types/tag";
import { generateRandomString } from "./randomData";

export function generateRandomTagsToCreate(count: number): TTagCreate[] {
  const tags: TTagCreate[] = [];

  for (let i = 0; i < count; i++) {
    const tag: TTagCreate = {
      localId: generateRandomString(8),
      name: `Tag-${generateRandomString(5)}`,
      authorId: generateRandomString(8),

      projectId: Math.random() < 0.5 ? generateRandomString(8) : undefined,
      carItemId: Math.random() < 0.3 ? generateRandomString(8) : undefined,
    };

    tags.push(tag);
  }

  return tags;
}
