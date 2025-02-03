import { TBasicProject } from "../types/project";

const projectMiniData: TBasicProject = {
  carMake: "Audi",
  createdAt: new Date(),
  engineNameAndCapacity: "TFSI 2.0",
  forSell: false,
  id: "1",
  isVerified: false,
  isVisible: true,
  images: [],
  carModel: "A3",
  updatedAt: new Date(),
  author: {
    id: "1",
    name: "Marek",
  },
  acc_0_100: 7.2,
  acc_100_200: 7.2,
  hp: 150,
  nm: 250,
  stageNumber: 2,
  engineStockHp: 120,
  engineStockNm: 200,
  description: "Audi A3 8V 1.4 TFSI 150KM",
  tags: [
    {
      id: "1",
      name: "Audi",
    },
    {
      id: "2",
      name: "A3",
    },
  ],
  likesCount: 12,
  isLikedByAuthUser: true,
};

export { projectMiniData };
