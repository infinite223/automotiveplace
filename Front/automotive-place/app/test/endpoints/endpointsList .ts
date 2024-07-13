export type TEndpointsNames =
  | "CreateCarItemFunction"
  | "RemoveCarItemFunction"
  | "GetAllCarItemsFunction"
  | "CreateProjectFunction"
  | "GetMainContentDataForUserFunction";

export interface IEndpoint {
  name: string;
  description: string;
  functionType: TEndpointsNames;
  runs: number;
}

export const endpointsWithNumberRunList: IEndpoint[] = [
  {
    name: "CreateCarItem",
    description:
      "Tworzy pojedyńczy podzespół w bazie danych dla konkretnego użytkownika.",
    functionType: "CreateCarItemFunction",
    runs: 0,
  },
  {
    name: "RemoveCarItem",
    description: "Usuwa wybrany podzespół z bazy danych.",
    functionType: "RemoveCarItemFunction",
    runs: 0,
  },
  {
    name: "GetAllCarItems",
    description:
      "Wyciąga z bazy danych wszystkie możliwe podzespoły, ilość jest ograniczana przez podany limit.",
    functionType: "GetAllCarItemsFunction",
    runs: 0,
  },
  {
    name: "CreateProject",
    description:
      "Dodaje projekt do bazy danych dla dlanego użytkownika  i garażu",
    functionType: "CreateProjectFunction",
    runs: 0,
  },
  {
    name: "GetMainContentDataForUser",
    description:
      "Pobiera z bazy daną ilość kontentu dla użytkownika (posty, projekty, problemy itp...)",
    functionType: "GetMainContentDataForUserFunction",
    runs: 0,
  },
];
