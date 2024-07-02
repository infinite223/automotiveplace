import { TCarItem } from "./types/carItem";
import { TPost } from "./types/post";
import { TProblem } from "./types/problem";
import { TProject } from "./types/project";
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
  status: ErrorStatus | "Success" | "Information";
  message?: string;
  title: string;
  date: Date;
};

enum ErrorStatus {
  Low = 0,
  Medium = 1,
  High = 2,
  Critical = 3,
}

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

type TContentData = {
  type: TContentTypes;
  data: TCarItem | TProject | TProblem | TSpot | TPost;
};

type ICreateNotification = {
  log: TLog;
  leftIcon?: JSX.Element;
  timer: number;
};

type INotification = {
  id: number;
  log: TLog;
  leftIcon?: JSX.Element;
  timer: number;
};

export type {
  TCarItemLikes,
  TTableView,
  TSearchOptions,
  TLog,
  TPerformanceType,
};
export type {
  TValidResult,
  TContentData,
  TContentTypes,
  ICreateNotification,
  INotification,
};

export { ErrorStatus };
