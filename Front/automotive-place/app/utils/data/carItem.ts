import { ItemTypes, TCarItem } from "../types/carItem";

const carItems: TCarItem[] = [
  {
    id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    forSell: false,
    inUse: false,
    likesCount: 2,
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
    likesCount: 1,
    isVisible: true,
    itemType: ItemTypes.Audio,
    name: "JBL s1024",
    projectId: "",
  },
];

for (let i = 0; i < 10; i++) {
  carItems.push({
    id: (i + 3).toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat iaculis elementum. Donec fermentum, turpis nec condimentum consectetur, libero libero pretium erat, sit amet congue mi lorem et ligula. Fusce odio tortor, feugiat eu mi porta, auctor aliquet nulla.",
    forSell: i % 2 === 0,
    likesCount: 4,
    authorId: (i + 3).toString(),
    inUse: i % 3 === 0,
    isVisible: true,
    itemType: ItemTypes.Turbo,
    name: "Item " + (i + 1),
    projectId: "",
  });
}

export { carItems };
