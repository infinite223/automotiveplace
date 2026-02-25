import { TVisualModificationCreate } from "@/app/utils/types/visualModification";

export function mapVisualModificationsToPrisma(
  modifications: TVisualModificationCreate[],
  authorId: string,
) {
  if (!modifications || modifications.length === 0) return undefined;

  return {
    create: modifications.map((m) => ({
      name: m.name,
      description: m.description || "",
      modificationType: m.modificationType,
      isVisible: m.isVisible ?? true,
      authorId: authorId,
    })),
  };
}
