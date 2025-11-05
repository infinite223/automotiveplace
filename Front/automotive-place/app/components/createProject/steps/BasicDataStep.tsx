import React, { useEffect, useState } from "react";
import { AMPTextarea } from "../../shared/AMPTextarea";
import { AMPInput } from "../../shared/AMPInput";
import { IInputValue } from "..";

interface BasicDataStepProps {
  onPrev: () => void;
  setIsValid: (isValid: boolean) => void;
  registerGetData?: (fn: () => unknown) => void;
  initialData?: any;
}

export const BasicDataStep = ({
  setIsValid,
  registerGetData,
  initialData,
}: BasicDataStepProps) => {
  const [carModel, setCarModel] = useState("");
  const [carMake, setCarMake] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [description, setDescription] = useState<IInputValue>({
    value: "",
    errorText: null,
  });

  useEffect(() => {
    if (initialData) {
      setCarModel(initialData.carModel || "");
      setCarMake(initialData.carMake || "");
      setIsVisible(initialData.isVisible || false);
      setDescription({
        value: initialData.description || "",
        errorText: null,
      });
    }
  }, [initialData]);

  useEffect(() => {
    const isValid = carMake.trim().length > 0 && carModel.trim().length > 0;
    setIsValid(isValid);
  }, [carMake, carModel]);

  useEffect(() => {
    registerGetData?.(() => ({
      carMake,
      carModel,
      isVisible,
      description: description.value,
    }));
  }, [carMake, carModel, isVisible, description]);

  return (
    <div className="flex flex-col gap-4">
      <AMPInput
        type="text"
        placeholder="Marka (np. Audi)"
        value={carMake}
        setValue={(text) => setCarMake(text.toString())}
        name="Marka"
      />
      <AMPInput
        type="text"
        placeholder="Model (np. A3 8P)"
        value={carModel}
        setValue={(text) => setCarModel(text.toString())}
        name="Model"
      />
      <AMPTextarea
        name="Opis projektu"
        setValue={(text) => setDescription({ value: text, errorText: "" })}
        value={description.value}
        placeholder="Np. Seryjna turbina, bez modyfikacji..."
        inputStyles={{ fontSize: 12, height: "150px" }}
      />
    </div>
  );
};
