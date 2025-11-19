import { generateRandomStagesToCreate } from "@/app/utils/data/stage";
import { TProjectCreate } from "@/app/utils/types/project";

export const stepperDataToCreateProject = (steps: any): TProjectCreate => {
  console.log(steps);
  const stages = generateRandomStagesToCreate(1);

  return {
    garageId: "garage2",

    carMake: steps[0].data.carMake,
    carModel: steps[0].data.carModel,
    description: steps[0].data.description,
    name: steps[0].data.name,

    engineCapacity: 2,
    engineName: "Test",
    engineDescription: "Taki sobie silnik",
    engineStockHp: 300,
    engineStockNm: 420,
    engineWasSwapped: false,
    transmissionWasSwapped: false,
    transmissionDescription: "opis skrzyni",
    transmissionGears: 5,
    transmissionName: "ZF8hp",
    transmissionType: 1,

    imagesCount: 0,

    stages,

    carItemsCount: 0,
    carItems: [],

    tags: [],
    isVisible: true,
    projectPrice: 30000,
    forSell: false,
  };
};
