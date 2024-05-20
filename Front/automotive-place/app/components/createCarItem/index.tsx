import React, {useState} from "react";
import {AMPInput} from "./../shared/AMPInput";
import {validCarElement} from "./Validation";
import {AMPTextarea} from "../shared/AMPTextarea";
import Link from "next/link";
import {GrHelpBook} from "react-icons/gr";
import {AMPHelpFooter} from "../shared/AMPHelpFooter";
import {ItemTypes, TCarItem, TCarItemCreate} from "@/app/utils/types";
import {CarItem} from "@prisma/client";

interface IInputValue {
  value: string | number;
  errorText: string | null;
}

export const CreateCarItemView = () => {
  const [nameElement, setNameElement] = useState<IInputValue>({
    value: "",
    errorText: null,
  });
  const [forSell, setForSell] = useState(false);
  const [inUse, setInUse] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [itemType, setItemType] = useState<ItemTypes>("Brakes");
  const [description, setDescription] = useState<IInputValue>({
    value: "",
    errorText: null,
  });

  const onSubmit = () => {
    const newElement: TCarItemCreate = {
      authorId: "",
      description: description.value.toString(),
      name: nameElement.value.toString(),
      forSell,
      inUse,
      itemType,
      isVisible,
      projectId: "",
    };

    if (!validCarElement(newElement)) {
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
      className="flex items-center justify-center text-custom-primary text-sm rounded-md w-[330px]"
      onClick={(e) => e.stopPropagation()}
    >
      <form
        className="rounded-md p-2 flex flex-col w-11/12 max-w-lg group"
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
        <AMPTextarea
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

        <AMPHelpFooter footerText="Czym jest element?" />
      </form>
    </main>
  );
};
