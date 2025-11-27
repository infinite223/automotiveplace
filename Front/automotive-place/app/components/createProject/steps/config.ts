import { IStepsOptions } from "../../shared/Stepper/models";
import { BasicDataStep } from "./BasicDataStep";
import { EngineTransmissionStep } from "./EngineTransmissionStep";
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
      name: "Silnik i skrzynia biegów",
      description: "Podstawowe informacje o silniku oraz skrzyni biegów",
      component: EngineTransmissionStep,
    },
    {
      name: "Zdjęcia",
      description: "Dodaj zdjęcia swojego projektu",
      component: ImagesDataStep,
    },
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
