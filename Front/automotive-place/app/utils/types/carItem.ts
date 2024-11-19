import { TCarItemLikes } from "../types";
import { TProject } from "./project";
import { TTag, TTagCreate } from "./tag";
import { TUser } from "./user";

type TCarItem = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  forSell: boolean;
  isVisible: boolean;
  inUse: boolean;
  name: string;
  description: string;
  isLikedByAuthUser?: boolean;
  itemType: ItemTypes;
  likes?: TCarItemLikes[];
  authorId: string;
  projectId?: string;
  project?: TProject;
  author?: TUser;
  tags?: TTag[];
};

function isTCarItem(data: any): data is TCarItem {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.id === "string" &&
    // data.createdAt instanceof Date &&
    // data.updatedAt instanceof Date &&
    typeof data.forSell === "boolean" &&
    typeof data.isVisible === "boolean" &&
    typeof data.inUse === "boolean" &&
    typeof data.name === "string" &&
    typeof data.description === "string" &&
    (typeof data.isLikedByAuthUser === "boolean" ||
      data.isLikedByAuthUser === undefined) &&
    typeof data.itemType === "string" && // assuming ItemTypes is a string union
    (Array.isArray(data.likes) || data.likes === undefined) &&
    typeof data.authorId === "string" &&
    (typeof data.projectId === "string" || data.projectId === undefined) &&
    (typeof data.author === "object" || data.author === undefined) &&
    (Array.isArray(data.tags) || data.tags === undefined)
  );
}

type TCarItemCreate = {
  forSell: boolean;
  isVisible: boolean;
  inUse: boolean;
  name: string;
  description: string;
  itemType: ItemTypes;
  authorId: string;
  projectId?: string;
  tags: TTagCreate[];
};

enum ItemTypes {
  Turbo = "Turbo",
  Exhaust = "Exhaust",
  Kompressor = "Kompressor",
  Brakes = "Brakes",
  Audio = "Audio",
  Clutch = "Clutch",
  Suspension = "Suspension",
  EngineTuneUp = "Engine Tune-up",
  Transmission = "Transmission",
  Wheels = "Wheels",
  Tires = "Tires",
  FuelInjectors = "Fuel Injectors",
  CoolingSystem = "Cooling System",
  Battery = "Battery",
  Alternator = "Alternator",
  StarterMotor = "Starter Motor",
  SteeringSystem = "Steering System",
  Lights = "Lights",
  BodyKit = "Body Kit",
  Other = "Other",
  Candles = "Candles",
  Driver = "Driver",
}


export function isValidItemType(type: any): type is ItemTypes {
  return Object.values(ItemTypes).includes(type);
}

const itemTypesArray = Object.values(ItemTypes).map((value) => ({
  label: value,
  value: value,
}));

export { ItemTypes, itemTypesArray, isTCarItem };

export type { TCarItem, TCarItemCreate };
