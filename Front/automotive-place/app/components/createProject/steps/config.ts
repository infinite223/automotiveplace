import { BasicDataStep } from "./BasicDataStep";

export const stepsOptions = {
  title: "Dodawanie projektu",
  items: [
    {
      name: "Podstawowe informacje",
      description: "Podaj podstawowe informacje o pojezdzie",
      component: BasicDataStep,
    },
    {
      name: "Zdjęcia",
      description: "Dodaj zdjęcia swojego projektu",
      component: BasicDataStep,
    },
    {
      name: "Orginalne parametry",
      description: "Podaj orginalne parametry pojazdu",
      component: BasicDataStep,
    },
    {
      name: "Części",
      description: "Dodaj istotne części które wykorzystuje twój projekt",
      component: BasicDataStep,
    },
    {
      name: "Etapy modyfikacji",
      description: "Dodaj etapy modyfikacji projektu",
      component: BasicDataStep,
    },
    {
      name: "Podsumowanie",
      description: "Podsumowanie projektu",
      component: BasicDataStep,
    },
  ],
};
