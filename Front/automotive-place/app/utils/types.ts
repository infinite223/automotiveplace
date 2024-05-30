import { ICreateNotification } from "../components/logger/Notification";

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

export type { TCarItemLikes, TTableView, TSearchOptions, TLog };
export type { TValidResult };

export { ErrorStatus };
