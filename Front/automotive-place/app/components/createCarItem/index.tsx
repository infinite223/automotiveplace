import React, {useState} from "react";
import {AMPInput} from "./../shared/AMPInput";
import {validCarElement, validCarNameValue} from "./Validation";
import {AMPTextarea} from "../shared/AMPTextarea";
import Link from "next/link";
import {GrHelpBook} from "react-icons/gr";
import {AMPHelpFooter} from "../shared/AMPHelpFooter";
import {ItemTypes, TCarItem, TCarItemCreate} from "@/app/utils/types";
import {CarItem} from "@prisma/client";
import {createCarItem} from "@/app/services/carItem";

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
  const [itemType, setItemType] = useState<ItemTypes>(ItemTypes.Brakes);
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

    const newElement_2: TCarItemCreate = {
      authorId: "",
      description: description.value.toString(),
      name: nameElement.value.toString(),
      forSell: false,
      inUse: false,
      itemType: ItemTypes.Audio,
      isVisible: false,
      projectId: "22",
    };

    const {error, valid} = validCarElement(newElement);

    if (valid) {
      const result = createCarItem(newElement_2);
      console.log(result);
    } else {
      throw new Error(error);
    }
  };

  return (
    <main
      className="flex justify-center text-custom-primary text-sm rounded-md"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-[150px] h-[11/12] p-3 mr-0 rounded-sm border-r border-zinc-700"></div>
      <form
        className="rounded-md p-2 pr-4 pl-4 flex flex-col max-w-lg group w-[300px]"
        noValidate
        action={onSubmit}
      >
        <AMPInput
          name="Nazwa elementu"
          setValue={(text) =>
            setNameElement({
              value: text,
              errorText: validCarNameValue(text).error,
            })
          }
          value={nameElement.value}
          placeholder="Np. Turbina K03s"
          inputStyles={{fontSize: 12}}
          errorText={nameElement.errorText}
        />
        <AMPTextarea
          name="Opis elementu"
          setValue={(text) => setDescription({value: text, errorText: ""})}
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
