import { IStepsOptions } from "../../shared/Stepper/models";
import { BasicDataStep } from "./BasicDataStep";
import { ImagesDataStep } from "./ImagesDataStep";
import { ParamsDataStep } from "./ParamsDataStep";

export const stepsOptions: IStepsOptions = {
  title: "Dodawanie projektu",
  items: [
    {
      name: "Podstawowe informacje",
      description: "Informacje o pojezdzie",
      component: BasicDataStep,
    },
    {
      name: "Zdjęcia",
      description: "Dodaj zdjęcia swojego projektu",
      component: ImagesDataStep,
    },
    // {
    //   name: "Orginalne parametry",
    //   description: "Podaj orginalne parametry pojazdu",
    //   component: ParamsDataStep,
    // },
    // {
    //   name: "Części",
    //   description: "Dodaj istotne części które wykorzystuje twój projekt",
    //   component: BasicDataStep,
    // },
    // {
    //   name: "Etapy modyfikacji",
    //   description: "Dodaj etapy modyfikacji projektu",
    //   component: BasicDataStep,
    // },
    // {
    //   name: "Podsumowanie",
    //   description: "Podsumowanie projektu",
    //   component: BasicDataStep,
    // },
  ],
};
