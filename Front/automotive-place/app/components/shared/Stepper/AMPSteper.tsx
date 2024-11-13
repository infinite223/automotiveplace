import { saveStepData } from "@/lib/features/stepData/stepDataSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

interface StepProps {
  onNext: (data: any) => void;
  onPrev: () => void;
}

interface IStep {
  name: string;
  description: string;
  icon?: JSX.Element;
  component: React.ComponentType<StepProps>;
}

interface IStepsOptions {
  title: string;
  items: IStep[];
}

export const AMPStepper = ({
  stepsOptions,
}: {
  stepsOptions: IStepsOptions;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();

  const handleNext = (data: any) => {
    dispatch(saveStepData({ step: currentStep, data }));
    setCurrentStep((prevStep) =>
      Math.min(prevStep + 1, stepsOptions.items.length - 1)
    );
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const StepComponent = stepsOptions.items[currentStep].component;

  return (
    <div className="flex w-full gap-8 border-1 p-4">
      <div className="w-1/12">
        <h2 className="text-lg font-bold">{stepsOptions.title}</h2>
        <ul className="flex flex-col gap-2 mt-4">
          {stepsOptions.items.map((step, index) => (
            <li key={index}>
              <button
                className={`w-full text-left px-4 py-2 border-1 ${
                  currentStep === index
                    ? "font-bold text-redColor"
                    : "text-gray-600"
                }`}
                onClick={() => goToStep(index)}
              >
                {step.icon && <span className="mr-2">{step.icon}</span>}
                {step.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-11/12">
        <div className="flex flex-col mb-2">
          <h3 className="text-md font-semibold">
            {stepsOptions.items[currentStep].name}
          </h3>
          <p className="text-sm">
            {stepsOptions.items[currentStep].description}
          </p>
        </div>
        <StepComponent onNext={handleNext} onPrev={handlePrev} />
      </div>
    </div>
  );
};
