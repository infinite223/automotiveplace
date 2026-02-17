import { THistoryCreate } from "@/app/utils/types/history";

export function mapSingleHistoryToPrisma(
  history: THistoryCreate,
  authorId: string,
) {
  return {
    title: history.title,
    description: history.description || null,
    date: new Date(history.date),
    mileage:
      typeof history.mileage === "string"
        ? parseInt(history.mileage, 10)
        : history.mileage,
    price: history.price ? Number(history.price) : null,
    authorId,
    companyId: history.companyId || null,
    isVisible: history.isVisible,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function mapManyHistoryToPrisma(
  historyEntries: THistoryCreate[],
  authorId: string,
) {
  if (!historyEntries?.length) return undefined;

  return {
    create: historyEntries.map((h) => mapSingleHistoryToPrisma(h, authorId)),
  };
}
