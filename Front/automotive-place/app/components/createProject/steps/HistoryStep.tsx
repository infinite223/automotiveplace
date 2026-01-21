import React, { useState, useEffect, useRef } from "react";
import { TStepHistoryCreate } from "@/app/utils/types/history";
import { HistoryForm } from "./HistoryForm";

interface HistoryStepProps {
  setIsValid: (isValid: boolean) => void;
  registerGetData?: (fn: () => unknown) => void;
  initialData?: any;
}

export const HistoryStep: React.FC<HistoryStepProps> = ({
  setIsValid,
  registerGetData,
  initialData = [],
}) => {
  const [history, setHistory] = useState<TStepHistoryCreate[]>(
    initialData?.length ? initialData : [],
  );
  const lastHistoryRef = useRef<HTMLDivElement>(null);

  const updateHistory = (
    index: number,
    field: keyof TStepHistoryCreate,
    value: any,
  ) => {
    setHistory((prev) =>
      prev.map((h, i) => (i === index ? { ...h, [field]: value } : h)),
    );
  };

  const addHistory = () => {
    setHistory((prev) => [
      ...prev,
      {
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        mileage: "",
        price: "",
      },
    ]);
  };

  const removeHistory = (index: number) => {
    setHistory((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    // Prosta walidacja: tytuł i przebieg muszą być uzupełnione
    const valid = history.every((h) => h.title && h.mileage);
    setIsValid(valid);
    registerGetData?.(() => history);
  }, [history, setIsValid, registerGetData]);

  useEffect(() => {
    if (history.length > 0 && lastHistoryRef.current) {
      lastHistoryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [history.length]);

  return (
    <div className="flex flex-col gap-4 overflow-auto h-[calc(100vh-180px)] pr-2 no-scrollbar">
      {history.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 opacity-60">
          <p>Brak wpisów w historii serwisowej.</p>
          <button onClick={addHistory} className="text-amp-500 font-bold mt-2">
            Dodaj pierwszy wpis
          </button>
        </div>
      )}
      {history.map((item, index) => (
        <div
          key={index}
          ref={index === history.length - 1 ? lastHistoryRef : null}
        >
          <HistoryForm
            item={item}
            index={index}
            onChange={(field, value) => updateHistory(index, field, value)}
            onRemove={() => removeHistory(index)}
            onAdd={addHistory}
            isLast={index === history.length - 1}
          />
        </div>
      ))}
    </div>
  );
};
