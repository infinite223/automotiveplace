import { Status } from "./enums";
import { TCarItem } from "./types/carItem";
import { TBasicPost } from "./types/post";
import { TProblem } from "./types/problem";
import { TBasicProject } from "./types/project";
import { TSpot } from "./types/spot";

type TCarItemLikes = {};

// type ItemTypes = "Turbo" | "Exhaust" | "Kompressor" | "Brakes" | "Audio" | "Clutch" | "Suspension" | "Engine Tune-up" | "Transmission" | "Wheels" | "Tires" | "Fuel Injectors" | "Cooling System" | "Battery" | "Alternator" | "Starter Motor" | "Steering System" | "Lights" | "Body Kit";

type TSearchOptions = {
  query: string;
  type: "local" | "database";
};

// Tłumaczenia:
// Turbo: Turbo
// Exhaust: Układ wydechowy
// Kompressor: Sprężarka (lub Kompresor)
// Brakes: Hamulce
// Audio: System audio
// Clutch: Sprzęgło
// Suspension: Zawieszenie
// Engine Tune-up: Regulacja silnika
// Transmission: Skrzynia biegów
// Wheels: Koła
// Tires: Opony
// Fuel Injectors: Wtryskiwacze paliwa
// Cooling System: Układ chłodzenia
// Battery: Bateria
// Alternator: Alternator
// Starter Motor: Rozrusznik
// Steering System: Układ kierowniczy
// Lights: Oświetlenie
// Body Kit: Zestaw karoserii
// Candles: Świece

type TTableView = "elements" | "rows";
type TValidResult = {
  error: string;
  valid: boolean;
  notification?: ICreateNotification | null;
};

type TLog = {
  status: Status;
  message?: string;
  title: string;
  date: Date;
};

type TPerformanceType = {
  hp: number;
  nm: number;
  acc_0_100?: number;
  acc_100_200?: number;
  acc_50_150?: number;
  sl_100_0?: number;
  sl_150_50?: number;
};

type TContentTypes =
  | "CarItem"
  | "Project"
  | "Spot"
  | "Problem"
  | "Post"
  | "Company";

type TContentDataOptions =
  | TCarItem
  | TBasicProject
  | TProblem
  | TSpot
  | TBasicPost;

type TContentData = {
  type: TContentTypes;
  data: TContentDataOptions;
};

type ICreateNotification = {
  log: TLog;
  leftIcon?: JSX.Element;
  timer: number;
  showIcon?: boolean;
};

type INotification = {
  id: number;
  log: TLog;
  leftIcon?: JSX.Element;
  showIcon?: boolean;
  timer: number;
};

export type {
  TCarItemLikes,
  TTableView,
  TSearchOptions,
  TLog,
  TPerformanceType,
  TContentDataOptions,
};
export type {
  TValidResult,
  TContentData,
  TContentTypes,
  ICreateNotification,
  INotification,
};
