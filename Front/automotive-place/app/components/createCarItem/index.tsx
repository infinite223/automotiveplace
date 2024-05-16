import React, {useState} from "react";
import {AMPInput} from "./../shared/AMPInput";
import {validCarElement} from "./Validation";

interface IInputValue {
  value: string | number;
  errorText: string | null;
}

export const CreateCarItemView = () => {
  const [nameElement, setNameElement] = useState<IInputValue>({
    value: "",
    errorText: null,
  });
  const [description, setDescription] = useState<IInputValue>({
    value: "",
    errorText: null,
  });

  const onSubmit = () => {
    if (!validCarElement()) {
    }
  };

  const validValue = (value: string | number) => {
    if (typeof value === "number") {
      return "Nazwa elementu nie może być liczbą";
    }

    if (value.length < 3) {
      return "Nazwa elementu musi być dłuższa";
    }

    return null;
  };

  return (
    <main
      className="flex items-center justify-center text-custom-primary text-sm rounded-md w-[300px]"
      onClick={(e) => e.stopPropagation()}
    >
      <form
        className="rounded-md p-5 pt-10 pb-10 flex flex-col w-11/12 max-w-lg group"
        noValidate
        action={onSubmit}
      >
        <AMPInput
          name="Nazwa elementu"
          setValue={(text) =>
            setNameElement({value: text, errorText: validValue(text)})
          }
          value={nameElement.value}
          placeholder="Np. Turbina K03s"
          inputStyles={{fontSize: 12}}
          errorText={nameElement.errorText}
        />
        <AMPInput
          name="Opis elementu"
          setValue={(text) =>
            setDescription({value: text, errorText: validValue(text)})
          }
          value={description.value}
          placeholder="Np. Seryjna turbina, bez modyfikacji, orginalnie była w audi A3 8p "
          inputStyles={{fontSize: 12}}
        />
        <button
          type="submit"
          className="mt-4 bg-teal-800 py-2 rounded-md text-white group-invalid:pointer-events-none group-invalid:opacity-50"
        >
          Dodaj element
        </button>
      </form>
    </main>
  );
};
