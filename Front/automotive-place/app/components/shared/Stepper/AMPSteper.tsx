import { saveStepData } from "@/lib/features/stepData/stepDataSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AMPButton } from "../AMPButton";

interface StepProps {
  onNext: (data: any) => void;
  onPrev: () => void;
  setIsValid: (isValid: boolean) => void;
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

interface AMPStepperProps {
  stepsOptions: IStepsOptions;
  hideHeader?: boolean;
  onSubmit?: () => void;
}

export const AMPStepper = ({
  stepsOptions,
  hideHeader = false,
  onSubmit,
}: AMPStepperProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isStepValid, setIsStepValid] = useState(false);
  const dispatch = useDispatch();

  const handleNext = (data: any) => {
    dispatch(saveStepData({ step: currentStep, data }));
    if (currentStep < stepsOptions.items.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const StepComponent = stepsOptions.items[currentStep].component;
  const isLastStep = currentStep === stepsOptions.items.length - 1;

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    }
  };

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
                onClick={() => setCurrentStep(index)}
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
          <StepComponent
            onNext={handleNext}
            onPrev={handlePrev}
            setIsValid={setIsStepValid}
          />
        </div>

        <div className="flex gap-2 items-center ml-auto">
          {currentStep > 0 && (
            <AMPButton name="Cofnij" type="secondary" onClick={handlePrev} />
          )}

          {!isLastStep ? (
            <AMPButton
              name="Dalej"
              onClick={() => handleNext({})}
              disabled={!isStepValid}
            />
          ) : (
            <AMPButton
              name="Zakończ"
              onClick={handleSubmit}
              disabled={!isStepValid}
            />
          )}
        </div>
      </div>
    </div>
  );
};
