import { TCarItemLikes } from "../types";
import { TProject } from "./project";
import { TTag } from "./tag";
import { TUser } from "./user";

type TCarItem = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  forSell: boolean;
  isVisible: boolean;
  inUse: boolean;
  likesCount: number;
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

type TCarItemCreate = {
  forSell: boolean;
  isVisible: boolean;
  inUse: boolean;
  name: string;
  description: string;
  itemType: ItemTypes;
  authorId: string;
  projectId?: string;
  tags?: TTag[];
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

enum ItemTypesPL {
  Turbo = "Turbo",
  Exhaust = "Wydech",
  Kompressor = "Kompresor",
  Brakes = "Hamulce",
  Audio = "Audio",
  Clutch = "Sprzęgło",
  Suspension = "Zawieszenie",
  EngineTuneUp = "Strojenie silnika",
  Transmission = "Skrzynia biegów",
  Wheels = "Koła",
  Tires = "Opony",
  FuelInjectors = "Wtryskiwacze paliwa",
  CoolingSystem = "Układ chłodzenia",
  Battery = "Akumulator",
  Alternator = "Alternator",
  StarterMotor = "Rozrusznik",
  SteeringSystem = "Układ kierowniczy",
  Lights = "Światła",
  BodyKit = "Body Kit",
  Other = "Inny",
  Candles = "Świece",
  Driver = "Sterownik",
}

const plToEnMap: { [key in ItemTypesPL]: ItemTypes } = {
  [ItemTypesPL.Turbo]: ItemTypes.Turbo,
  [ItemTypesPL.Exhaust]: ItemTypes.Exhaust,
  [ItemTypesPL.Kompressor]: ItemTypes.Kompressor,
  [ItemTypesPL.Brakes]: ItemTypes.Brakes,
  [ItemTypesPL.Audio]: ItemTypes.Audio,
  [ItemTypesPL.Clutch]: ItemTypes.Clutch,
  [ItemTypesPL.Suspension]: ItemTypes.Suspension,
  [ItemTypesPL.EngineTuneUp]: ItemTypes.EngineTuneUp,
  [ItemTypesPL.Transmission]: ItemTypes.Transmission,
  [ItemTypesPL.Wheels]: ItemTypes.Wheels,
  [ItemTypesPL.Tires]: ItemTypes.Tires,
  [ItemTypesPL.FuelInjectors]: ItemTypes.FuelInjectors,
  [ItemTypesPL.CoolingSystem]: ItemTypes.CoolingSystem,
  [ItemTypesPL.Battery]: ItemTypes.Battery,
  [ItemTypesPL.Alternator]: ItemTypes.Alternator,
  [ItemTypesPL.StarterMotor]: ItemTypes.StarterMotor,
  [ItemTypesPL.SteeringSystem]: ItemTypes.SteeringSystem,
  [ItemTypesPL.Lights]: ItemTypes.Lights,
  [ItemTypesPL.BodyKit]: ItemTypes.BodyKit,
  [ItemTypesPL.Other]: ItemTypes.Other,
  [ItemTypesPL.Candles]: ItemTypes.Candles,
  [ItemTypesPL.Driver]: ItemTypes.Driver,
};

export function translateCarItemTypesToEnglish(item: ItemTypesPL): ItemTypes {
  return plToEnMap[item];
}

export function isValidItemType(type: any): type is ItemTypes {
  return Object.values(ItemTypes).includes(type);
}

const itemTypesArray = Object.values(ItemTypesPL).map((value) => ({
  label: value,
  value: value,
}));

export { ItemTypesPL, ItemTypes, itemTypesArray };

export type { TCarItem, TCarItemCreate };
