import { generateRandomStagesToCreate } from "@/app/utils/data/stage";
import { TProjectCreate } from "@/app/utils/types/project";

export const stepperDataToCreateProject = (steps: any): TProjectCreate => {
  const basic = steps[0]?.data || {};
  const engine = steps[1]?.data || {};

  const stages = generateRandomStagesToCreate(1);

  return {
    garageId: "garage2",

    // Step 1
    carMake: basic.carMake,
    carModel: basic.carModel,
    description: basic.description,
    name: basic.name,

    // Step 2
    engineCapacity: engine.engineCapacity,
    engineName: engine.engineName,
    engineDescription: engine.engineDescription,
    engineStockHp: engine.engineStockHp,
    engineStockNm: engine.engineStockNm,
    engineWasSwapped: engine.engineWasSwapped,

    transmissionWasSwapped: engine.transmissionWasSwapped,
    transmissionDescription: engine.transmissionDescription,
    transmissionGears: engine.transmissionGears,
    transmissionName: engine.transmissionName,
    transmissionType: engine.transmissionType,

    // Reszta na razie na sztywno
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
