import {
  ItemTypes,
  TCarItemBaseOnProject,
  TCarItemCreate,
} from "./types/carItem";
import { TPostCreate } from "./types/post";
import { TProblemCreate } from "./types/problem";
import { TSpotCreate } from "./types/spot";
import { TStageCreate } from "./types/stage";

const carItemData: TCarItemBaseOnProject = {
  id: "1",
  date: new Date(),
  description: "Lorem ipsum...",
  itemType: ItemTypes.Turbo,
  name: "Turbo K04",
};

const carItemCreateData: TCarItemCreate = {
  description: "",
  forSell: false,
  inUse: true,
  isVisible: true,
  itemType: ItemTypes.Turbo,
  name: "",
  authorId: "",
  projectId: "",
  tags: [],
};

const problemData: TProblemCreate = {
  description: "",
  isVisible: true,
  title: "",
};

const postData: TPostCreate = {
  content: "",
  isVisible: true,
  title: "",
};

const spotData: TSpotCreate = {
  description: "",
  isVisible: true,
  title: "",
};

const stageCreateData: TStageCreate = {
  name: "",
  description: "",
  stageNumber: 0,
  carItems: [],
  stagePrice: 0,
  acc_50_150: 0,
  hp: 0,
  nm: 0,
  sl_100_0: 0,
  sl_150_50: 0,
  acc_0_100: 0,
  acc_100_200: 0,
};

export {
  carItemData,
  carItemCreateData,
  stageCreateData,
  problemData,
  spotData,
  postData,
};
