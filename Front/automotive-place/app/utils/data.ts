import { ItemTypes, TCarItem, TCarItemCreate } from "./types/carItem";

const carItemData: TCarItem = {
  id: "1",
  createdAt: new Date(),
  updatedAt: new Date(),
  description: "Lorem ipsum...",
  forSell: false,
  inUse: false,
  likesCount: 4,
  isVisible: true,
  itemType: ItemTypes.Turbo,
  name: "Turbo K04",
  authorId: "1",
  projectId: "",
};

const carItemCreateData: TCarItemCreate = {
  description: "",
  forSell: false,
  inUse: false,
  isVisible: true,
  itemType: ItemTypes.Turbo,
  name: "",
  authorId: "",
  projectId: "",
};

export { carItemData, carItemCreateData };
