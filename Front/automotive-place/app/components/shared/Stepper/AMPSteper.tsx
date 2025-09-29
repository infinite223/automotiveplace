import { saveStepData } from "@/lib/features/stepData/stepDataSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AMPButton } from "../AMPButton";

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
  hideHeader = false,
}: {
  stepsOptions: IStepsOptions;
  hideHeader?: boolean;
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

  const handleNextStep = () => {
    if (stepsOptions.items.length - 1 === currentStep) return;

    setCurrentStep((prevStep) =>
      Math.min(prevStep + 1, stepsOptions.items.length - 1)
    );
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const StepComponent = stepsOptions.items[currentStep].component;

  return (
    <div className="flex w-full gap-8">
      <div className="w-auto">
        {!hideHeader && (
          <h2 className="text-lg font-bold mb-2">{stepsOptions.title}</h2>
        )}
        <ul className="flex flex-col gap-2">
          {stepsOptions.items.map((step, index) => (
            <li key={index}>
              <button
                className={`w-full text-left px-4 py-2 rounded-sm hover:bg-amp-200 ${
                  currentStep === index ? "bg-amp-200" : "text-opacity-70"
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

      <div className="w-11/12 flex flex-col justify-between h-full">
        <div className="flex flex-col mb-2 flex-1">
          <h3 className="text-md font-semibold">
            {stepsOptions.items[currentStep].name}
          </h3>
          <p className="text-sm">
            {stepsOptions.items[currentStep].description}
          </p>
          <StepComponent onNext={handleNext} onPrev={handlePrev} />
        </div>

        <div className="flex gap-2 items-center ml-auto">
          <AMPButton
            name="Cofnij"
            type="secondary"
            onClick={() => handlePrev()}
          />
          <AMPButton name="Dalej" onClick={handleNextStep} />
        </div>
      </div>
    </div>
  );
};
