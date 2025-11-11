import { generateRandomStagesToCreate } from "@/app/utils/data/stage";
import { TProjectCreate } from "@/app/utils/types/project";

export const stepperDataToCreateProject = (data: any): TProjectCreate => {
  console.log(data);
  const stages = generateRandomStagesToCreate(1);

  return {
    carMake: data[0].data.carMake,
    carModel: data[0].data.carModel,
    engineCapacity: 2,
    engineName: "Test",
    engineStockHp: 300,
    engineStockNm: 420,
    engineWasSwapped: false,
    forSell: false,
    garageId: "garage2",
    imagesCount: 0,
    isVisible: true,
    projectPrice: 30000,
    transmissionGears: 5,
    transmissionName: "ZF8hp",
    transmissionType: 1,
    transmissionDescription: "opis skrzyni",
    description: "Taki sobie projekt",
    engineDescription: "Taki sobie silnik",
    name: "Super projekt",
    stages,
    tags: [],
    carItemsCount: 0,
    carItems: [],
    transmissionWasSwapped: false,
  };
};
