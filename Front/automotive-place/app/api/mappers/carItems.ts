import { TCarItemCreate } from "@/app/utils/types/carItem";

export function mapCarItemsToPrisma(
  carItems: TCarItemCreate[] | undefined,
  authorId: string,
) {
  if (!carItems?.length) return undefined;

  return {
    create: carItems.map((ci) => ({
      name: ci.name?.trim() || "",
      description: ci.description,
      itemType: ci.itemType,
      forSell: ci.forSell,
      isVisible: ci.isVisible,
      inUse: ci.inUse,
      carItemPrice: ci.carItemPrice ?? null,

      author: {
        connect: { id: authorId },
      },
    })),
  };
}
