import { TBasicProject, TProject } from "../types/project";

const projectMiniData: TBasicProject = {
  carMake: "Audi",
  createdAt: new Date(),
  engineName: "TFSI",
  forSell: false,
  id: "1",
  isVerified: false,
  isVisible: true,
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
};

export { projectMiniData };
