import { ItemTypes, TCarItem, TCarItemCreate } from "../types/carItem";
import { generateRandomDate, generateRandomString } from "./randomData";

const carItems: TCarItem[] = [
  {
    id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    forSell: false,
    inUse: false,
    authorId: "1",
    isVisible: true,
    itemType: ItemTypes.Turbo,
    name: "Turbo K04",
    isLikedByAuthUser: false,
    projectId: "",
  },
  {
    id: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    forSell: true,
    inUse: false,
    authorId: "2",
    isVisible: true,
    itemType: ItemTypes.Audio,
    name: "JBL s1024",
    projectId: "",
  },
];

export function generateRandomCarItems(count: number) {
  let carItems = [];

  for (let i = 0; i < count; i++) {
    carItems.push({
      id: generateRandomString(34),
      createdAt: generateRandomDate(new Date(2020, 0, 1), new Date()),
      updatedAt: generateRandomDate(new Date(2020, 0, 1), new Date()),
      description: generateRandomString(25),
      forSell: i % 2 === 0,
      likesCount: 4,
      authorId: (i + 3).toString(),
      inUse: i % 3 === 0,
      isVisible: true,
      itemType: ItemTypes.Turbo,
      name: generateRandomString(5),
      projectId: generateRandomString(34),
    });
  }

  return carItems;
}

export function generateRandomCarItemsToCreate(count: number) {
  let carItemsToCreate: TCarItemCreate[] = [];

  for (let i = 0; i < count; i++) {
    carItemsToCreate.push({
      description: generateRandomString(25),
      forSell: i % 2 === 0,
      authorId: (i + 3).toString(),
      inUse: i % 3 === 0,
      isVisible: true,
      itemType: ItemTypes.Turbo,
      name: generateRandomString(5),
      projectId: generateRandomString(34),
    });
  }

  return carItemsToCreate;
}

export function getCarItemsTestToRemove(count: number) {
  let carItems: TCarItem[] = [];
  // carItems.push({

  // })
  return carItems;
}

export { carItems };
