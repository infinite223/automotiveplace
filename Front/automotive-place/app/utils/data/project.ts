import { TBasicProject, TProject, TProjectCreate } from "../types/project";
import {
  generateRandomDate,
  generateRandomString,
  getRandomInt,
} from "./randomData";
import { generateRandomStagesToCreate } from "./stage";
import { generateRandomCarItemsToCreate } from "./carItem";
import { generateRandomTagsToCreate } from "./tags";

const carMakes = [
  "BMW",
  "Audi",
  "Mercedes",
  "Volkswagen",
  "Ford",
  "Toyota",
  "Honda",
  "Mazda",
];
const carModels = {
  BMW: ["3 Series", "5 Series", "X5", "X3"],
  Audi: ["A3", "A4", "Q5", "Q7"],
  Mercedes: ["C-Class", "E-Class", "GLA", "GLC"],
  Volkswagen: ["Golf", "Passat", "Tiguan", "Polo"],
  Ford: ["Focus", "Mustang", "Explorer", "F-150"],
  Toyota: ["Corolla", "Camry", "RAV4", "Prius"],
  Honda: ["Civic", "Accord", "CR-V", "Fit"],
  Mazda: ["Mazda3", "Mazda6", "CX-5", "MX-5"],
};
const engineNames = ["TSI", "TDI", "EcoBoost", "SkyActiv", "Hybrid", "VTEC"];
const transmissionNames = ["Manual", "Automatic", "CVT", "DSG"];

export function generateRandomProjects(count: number) {
  const projects = [];

  for (let i = 0; i < count; i++) {
    const carMake = carMakes[getRandomInt(0, carMakes.length - 1)];
    const carModelOptions = carModels[carMake as keyof typeof carModels];
    const carModel =
      carModelOptions[getRandomInt(0, carModelOptions.length - 1)];

    const project: TProject = {
      id: generateRandomString(10),
      createdAt: generateRandomDate(new Date(2020, 0, 1), new Date()),
      updatedAt: generateRandomDate(new Date(2020, 0, 1), new Date()),
      forSell: Math.random() < 0.5,
      isVisible: Math.random() < 0.5,
      carMake,
      carModel,
      isVerified: Math.random() < 0.5,
      description: `A well-maintained ${carMake} ${carModel} with excellent performance and features.`,
      imagesCount: getRandomInt(0, 10),
      authorId: generateRandomString(8),
      engineCapacity: parseFloat(
        (Math.random() * (4.5 - 1.5) + 1.5).toFixed(1)
      ),
      engineName: engineNames[getRandomInt(0, engineNames.length - 1)],
      engineStockHp: getRandomInt(100, 400),
      engineStockNm: getRandomInt(150, 500),
      transmissionGears: getRandomInt(5, 8),
      transmissionName:
        transmissionNames[getRandomInt(0, transmissionNames.length - 1)],
      carItemsCount: getRandomInt(0, 20),
      garageId: generateRandomString(8),
      userId: generateRandomString(8),
      imagesUrl: "",
      transmissionType: getRandomInt(0, 3),
      images: [],
      author: {
        id: generateRandomString(8),
        name: "Dawid",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeyk55eIDh4grMFV4505_KRgtOm7HTGbm_7Q&s",
      },
      stages: [
        {
          acc_0_100: 7,
          acc_100_200: 17,
          acc_50_150: 14,
          createdAt: new Date(),
          createdById: "1",
          description: "Zwykły stage 1",
          hp: 270,
          id: "1",
          name: "Stage 1",
          nm: 420,
          projectId: "1",
          stageNumber: 1,
          updatedAt: new Date(),
          sl_100_0: 150,
          sl_150_50: 230,
          stagePrice: 2330,
        },
      ],
      isLikedByAuthUser: false,
      likesCount: 0,
    };

    projects.push(project);
  }

  return projects;
}

export function generateRandomBaseProjects(count: number) {
  const projects = [];

  const projectImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS68Gy62kKm-z60Pe_y32-kfkuaEmprwzvfKXfM_zhLiiC4ulIna5DlScrbubsjMtfzA9w&usqp=CAU";
  const projectImage2 =
    "https://media.drive.com.au/obj/tx_q:70,rs:auto:1200:675:1/driveau/upload/cms/uploads/bi36meqa62rhbghgdrkh";

  const projectImage3 =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAForxurppxANqMjH2I1CjPPg79vtTEN71FQ&s";

  const projectImage4 =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSdZIVym1fnqh7TWirmnbWEhUy0oJgEsQmCQ&s";

  const projectImages = [
    projectImage,
    projectImage2,
    projectImage3,
    projectImage4,
  ];

  for (let i = 0; i < count; i++) {
    const carMake = carMakes[getRandomInt(0, carMakes.length - 1)];
    const carModelOptions = carModels[carMake as keyof typeof carModels];
    const carModel =
      carModelOptions[getRandomInt(0, carModelOptions.length - 1)];

    const project: TBasicProject = {
      id: generateRandomString(10),
      createdAt: generateRandomDate(new Date(2020, 0, 1), new Date()),
      updatedAt: generateRandomDate(new Date(2020, 0, 1), new Date()),
      forSell: Math.random() < 0.5,
      isVisible: Math.random() < 0.5,
      carMake,
      carModel,
      isVerified: Math.random() < 0.5,
      description: `A well-maintained ${carMake} ${carModel} with excellent performance and features.`,
      engineNameAndCapacity:
        getRandomInt(1, 4) +
        ".0 L " +
        engineNames[getRandomInt(0, engineNames.length - 1)],

      images: projectImages,
      hp: getRandomInt(100, 400),
      engineStockHp: getRandomInt(100, 400),
      engineStockNm: getRandomInt(100, 400),
      stageNumber: 2,
      acc_0_100: getRandomInt(5, 10),
      acc_100_200: getRandomInt(15, 25),
      nm: getRandomInt(150, 500),
      author: {
        id: generateRandomString(8),
        name: "Dawid",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeyk55eIDh4grMFV4505_KRgtOm7HTGbm_7Q&s",
      },
      tags: [
        { id: generateRandomString(8), name: "Test tag" },
        { id: generateRandomString(8), name: "Test tag 2" },
      ],
      likesCount: 12,
      isLikedByAuthUser: true,
    };

    projects.push(project);
  }

  return projects;
}

export function generateRandomProjectsToCreate(
  count: number,
  generateStages: boolean = false,
  generateCarItems: boolean = false,
  generateTags: boolean = false
) {
  const projects = [];

  for (let i = 0; i < count; i++) {
    const stages = generateStages ? generateRandomStagesToCreate(4) : [];
    const carItems = generateCarItems ? generateRandomCarItemsToCreate(1) : [];
    const tags = generateTags ? generateRandomTagsToCreate(1) : [];

    const project: TProjectCreate = {
      forSell: Math.random() < 0.5,
      isVisible: Math.random() < 0.5,
      carMake: generateRandomString(5),
      carModel: generateRandomString(5),
      description: generateRandomString(12),
      authorId: (i + 3).toString() + generateRandomString(2),
      engineCapacity: 2,
      engineName: "TSI",
      engineStockHp: 200,
      carItemsCount: 0,
      engineWasSwapped: false,
      imagesCount: 32,
      engineStockNm: 280,
      garageId: "garage2", // generateRandomString(8),
      name: generateRandomString(5),
      projectPrice: getRandomInt(5000, 500000),
      stages,
      carItems,
      engineDescription: generateRandomString(10),
      transmissionDescription: generateRandomString(12),
      transmissionWasSwapped: false,
      transmissionGears: 6,
      transmissionName: generateRandomString(5),
      transmissionType: 0,
      tags,
    };

    projects.push(project);
  }
  return projects;
}

const projectsData = generateRandomProjects(10);

export { projectsData };
