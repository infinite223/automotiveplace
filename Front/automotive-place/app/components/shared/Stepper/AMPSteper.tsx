import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveStepData } from "@/lib/features/stepData/stepDataSlice";
import { AMPButton } from "../AMPButton";
import { AMPStepperProps } from "./models";

export const AMPStepper: React.FC<AMPStepperProps> = ({
  stepsOptions,
  hideHeader = false,
  onSubmit,
}) => {
  const dispatch = useDispatch();
  const stepData = useSelector((state: any) => state.stepData);

  const [currentStep, setCurrentStep] = useState(0);
  const [stepsValidity, setStepsValidity] = useState<boolean[]>(
    Array(stepsOptions.items.length).fill(false)
  );

  const getStepDataRef = useRef<(() => any) | null>(null);

  const updateStepValidity = (index: number, isValid: boolean) => {
    setStepsValidity((prev) => {
      const newValidity = [...prev];
      newValidity[index] = isValid;
      return newValidity;
    });
  };

  const handleNext = () => {
    if (getStepDataRef.current) {
      const data = getStepDataRef.current();
      dispatch(saveStepData({ step: currentStep, data }));
    }

    updateStepValidity(currentStep, true);

    if (currentStep < stepsOptions.items.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleSubmit = () => {
    if (getStepDataRef.current) {
      const data = getStepDataRef.current();
      dispatch(saveStepData({ step: currentStep, data }));
    }

    updateStepValidity(currentStep, true);

    if (onSubmit) onSubmit();
  };

  const StepComponent = stepsOptions.items[currentStep].component;
  const isLastStep = currentStep === stepsOptions.items.length - 1;
  const isCurrentStepValid = stepsValidity[currentStep];

  const currentStepData =
    stepData.find((item: any) => item.step === currentStep)?.data || null;

  return (
    <div className="flex w-full gap-8">
      <div className="w-auto">
        {!hideHeader && (
          <h2 className="text-lg font-bold mb-2">{stepsOptions.title}</h2>
        )}
        <ul className="flex flex-col gap-2">
          {stepsOptions.items.map((step, index) => {
            const isDisabled = index > 0 && !stepsValidity[index - 1];

            return (
              <li key={index}>
                <button
                  className={`w-full text-left px-4 py-2 rounded-sm transition ${
                    currentStep === index
                      ? "bg-amp-200 font-semibold"
                      : isDisabled
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:bg-amp-100"
                  }`}
                  onClick={() => {
                    if (!isDisabled) setCurrentStep(index);
                  }}
                  disabled={isDisabled}
                >
                  {step.name}
                </button>
              </li>
            );
          })}
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
            setIsValid={(valid) => updateStepValidity(currentStep, valid)}
            registerGetData={(fn) => (getStepDataRef.current = fn)}
            initialData={currentStepData}
          />
        </div>

        <div className="flex gap-2 items-center ml-auto">
          {currentStep > 0 && (
            <AMPButton name="Cofnij" type="secondary" onClick={handlePrev} />
          )}

          {!isLastStep ? (
            <AMPButton
              name="Dalej"
              onClick={handleNext}
              disabled={!isCurrentStepValid}
            />
          ) : (
            <AMPButton
              name="Zakończ"
              onClick={handleSubmit}
              disabled={!isCurrentStepValid}
            />
          )}
        </div>
      </div>
    </div>
  );
};
