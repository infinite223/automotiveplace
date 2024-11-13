"use client";

import React, { useState } from "react";
import { AMPStepper } from "../shared/Stepper/AMPSteper";

interface StepProps {
  onNext: (data: any) => void;
  onPrev: () => void;
}

export const Step1 = ({ onNext, onPrev }: StepProps) => {
  const [inputData, setInputData] = useState("");

  return (
    <div>
      <h4>Step 1 Content</h4>
      <input
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Enter data"
      />
      <button onClick={() => onNext({ inputData })}>Next</button>
    </div>
  );
};

export const Step2 = ({ onNext, onPrev }: StepProps) => {
  const [selection, setSelection] = useState("");

  return (
    <div>
      <h4>Step 2 Content</h4>
      <select value={selection} onChange={(e) => setSelection(e.target.value)}>
        <option value="">Choose...</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
      <button onClick={onPrev}>Back</button>
      <button onClick={() => onNext({ selection })}>Next</button>
    </div>
  );
};

const stepsOptions = {
  title: "My Custom Stepper",
  items: [
    {
      name: "Podstawowe informacje",
      description: "Podaj podstawowe informacje o pojezdzie",
      component: Step1,
    },
    {
      name: "Zdjęcia",
      description: "Dodaj zdjęcia swojego projektu",
      component: Step2,
    },
  ],
};

const PreviewTests = () => (
  <section className="flex h-screen flex-col items-center gap-8 justify-center">
    <h1 className="text-3xl font-bold">
      Zapisz się na wczesny dostęp i testy AMP
    </h1>
    <AMPStepper stepsOptions={stepsOptions} />
  </section>
);

export default PreviewTests;
