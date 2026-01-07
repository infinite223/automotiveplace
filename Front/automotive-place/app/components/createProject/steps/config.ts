import { IStepsOptions } from "../../shared/Stepper/models";
import { BasicDataStep } from "./BasicDataStep";
import { EngineTransmissionStep } from "./EngineTransmissionStep";
import { ImagesDataStep } from "./ImagesDataStep";
import { StagesStep } from "./StagesStep";
import { SummaryDataStep } from "./SummaryDataStep";

export const stepsOptions: IStepsOptions = {
  title: "Dodawanie projektu",
  items: [
    {
      name: "Podstawowe informacje",
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
    {
      name: "Etapy modyfikacji",
      description: "Dodaj etapy modyfikacji projektu",
      component: StagesStep,
    },
    // TODO - add tags
    {
      name: "Podsumowanie",
      description: "Podsumowanie projektu",
      component: SummaryDataStep,
    },
  ],
};
