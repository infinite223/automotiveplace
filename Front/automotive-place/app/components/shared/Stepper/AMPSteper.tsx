import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FiChevronLeft } from "react-icons/fi";
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getStepDataRef = useRef<(() => any) | null>(null);

  const sidebarVariants = {
    expanded: {
      width: 260,
      transition: { type: "spring", stiffness: 90 },
    },
    collapsed: {
      width: 60,
      transition: { type: "spring", stiffness: 90 },
    },
  };

  const textVariants = {
    visible: { opacity: 1, x: 0, transition: { duration: 0.18 } },
    hidden: { opacity: 0, x: -10, transition: { duration: 0.18 } },
  };

  const updateStepValidity = (index: number, isValid: boolean) => {
    setStepsValidity((prev) => {
      const next = [...prev];
      next[index] = isValid;
      return next;
    });
  };

  const handleNext = () => {
    if (getStepDataRef.current) {
      const data = getStepDataRef.current();
      dispatch(saveStepData({ step: currentStep, data }));
    }

    updateStepValidity(currentStep, true);

    if (currentStep < stepsOptions.items.length - 1) {
      setCurrentStep((p) => p + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((p) => Math.max(0, p - 1));
  };

  const handleSubmit = () => {
    let finalData = [...stepData];

    if (getStepDataRef.current) {
      const data = getStepDataRef.current();
      dispatch(saveStepData({ step: currentStep, data }));

      const index = finalData.findIndex((i) => i.step === currentStep);
      if (index !== -1) finalData[index] = { ...finalData[index], data };
      else finalData.push({ step: currentStep, data });
    }

    updateStepValidity(currentStep, true);
    onSubmit?.(finalData);
  };

  const StepComponent = stepsOptions.items[currentStep].component;

  const currentStepData =
    stepData.find((i: any) => i.step === currentStep)?.data || null;

  const isLastStep = currentStep === stepsOptions.items.length - 1;
  const isCurrentStepValid = stepsValidity[currentStep];

  return (
    <div className="flex w-full gap-8">
      <div className="relative flex">
        <motion.div
          className="
            border-r border-gray-200 dark:border-neutral-700
            shadow-sm py-4 h-auto
            text-black dark:text-neutral-200
            overflow-visible
          "
          variants={sidebarVariants}
          animate={isCollapsed ? "collapsed" : "expanded"}
          initial={false}
        >
          {!hideHeader && (
            <motion.h2
              variants={textVariants}
              animate={isCollapsed ? "hidden" : "visible"}
              className="text-lg font-bold px-4 mb-4"
            >
              {stepsOptions.title}
            </motion.h2>
          )}

          <ul className="flex flex-col gap-2 px-2">
            {stepsOptions.items.map((step, index) => {
              const isDisabled = index > 0 && !stepsValidity[index - 1];

              return (
                <li key={index}>
                  <button
                    className={`
                      w-full flex items-center gap-2 px-3 py-2 rounded transition
                      ${
                        currentStep === index
                          ? "bg-amp-200 dark:bg-amp-300/20 font-semibold"
                          : ""
                      }
                      ${
                        isDisabled
                          ? "text-gray-400 dark:text-neutral-600 cursor-not-allowed"
                          : "hover:bg-amp-100 dark:hover:bg-neutral-800"
                      }
                    `}
                    onClick={() => !isDisabled && setCurrentStep(index)}
                    disabled={isDisabled}
                  >
                    <div
                      className={`
                        w-2 h-2 rounded-full
                        ${
                          stepsValidity[index]
                            ? "bg-green-500 dark:bg-green-400"
                            : "bg-gray-300 dark:bg-neutral-600"
                        }
                      `}
                    />

                    <motion.span
                      variants={textVariants}
                      className="whitespace-nowrap"
                    >
                      {isCollapsed ? "  " : step.name}
                    </motion.span>
                  </button>
                </li>
              );
            })}
          </ul>
        </motion.div>

        <button
          onClick={() => setIsCollapsed((p) => !p)}
          className="
            absolute -right-4 top-8
            w-8 h-8 rounded-full
            bg-white dark:bg-amp-200
            border border-amp-700 dark:border-amp-200
            shadow flex items-center justify-center
            z-20 pointer-events-auto
          "
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-black dark:text-neutral-200"
          >
            <FiChevronLeft size={18} />
          </motion.div>
        </button>
      </div>

      <div className="w-full flex flex-col justify-between">
        <div className="flex flex-col mb-2 flex-1">
          <h3 className="text-xl font-semibold mb-2">
            {stepsOptions.items[currentStep].name}
          </h3>
          <p className="text-sm mb-4">
            {stepsOptions.items[currentStep].description}
          </p>

          <StepComponent
            onNext={handleNext}
            onPrev={handlePrev}
            setIsValid={(v) => updateStepValidity(currentStep, v)}
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
