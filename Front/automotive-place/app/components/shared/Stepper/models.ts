import { JSX } from "react";

export interface StepProps {
  onNext: (data: unknown) => void;
  onPrev: () => void;
  setIsValid: (isValid: boolean) => void;
  registerGetData?: (fn: () => unknown) => void;
  initialData?: unknown;
}

export interface IStep {
  name: string;
  description?: string;
  icon?: JSX.Element;
  component: React.ComponentType<StepProps>;
}

export interface IStepsOptions {
  title: string;
  items: IStep[];
}

interface IStepData {
  step: number;
  data: any;
}

export interface AMPStepperProps {
  stepsOptions: IStepsOptions;
  hideHeader?: boolean;
  onSubmit?: (allData: IStepData[]) => void;
}
