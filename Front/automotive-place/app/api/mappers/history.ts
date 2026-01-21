import { THistoryCreate } from "@/app/utils/types/history";

export function mapHistoryToPrisma(
  historyEntries: THistoryCreate[],
  authorId: string,
) {
  if (!historyEntries || historyEntries.length === 0) return undefined;

  return {
    create: historyEntries.map((h) => ({
      title: h.title,
      description: h.description || "",
      date: new Date(h.date),
      mileage:
        typeof h.mileage === "string" ? parseInt(h.mileage, 10) : h.mileage,
      price: h.price ? Number(h.price) : null,
      authorId: authorId,
      companyId: h.companyId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
  };
}
