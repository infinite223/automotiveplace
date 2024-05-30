import React, { useState } from "react";
import { AMPInput } from "./../shared/AMPInput";
import { validCarElement, validCarNameValue } from "./Validation";
import { AMPTextarea } from "../shared/AMPTextarea";
import { AMPHelpFooter } from "../shared/AMPHelpFooter";
import { createCarItem } from "@/app/services/carItem";
import { AMPSelect } from "../shared/AMPSelect";
import { IconFromItemType } from "../carItem/IconFromItemType";
import { AMPSwitch } from "../shared/AMPSwitch";
import {
  ItemTypes,
  ItemTypesPL,
  TCarItemCreate,
  itemTypesArray,
  translateCarItemTypesToEnglish,
} from "@/app/utils/types/carItem";
import { useDispatch } from "react-redux";
import { addNotification } from "@/lib/features/notifications/notificationsSlice";

interface IInputValue {
  value: string | number;
  errorText: string | null;
}

export const CreateCarItemView = () => {
  const dispatch = useDispatch();

  const [nameElement, setNameElement] = useState<IInputValue>({
    value: "",
    errorText: null,
  });
  const [carItemType, setCarItemType] = useState<ItemTypesPL>(
    ItemTypesPL.Turbo
  );
  const [forSell, setForSell] = useState(false);
  const [inUse, setInUse] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  // const [itemType, setItemType] = useState<ItemTypes>(ItemTypes.Brakes);
  const [description, setDescription] = useState<IInputValue>({
    value: "",
    errorText: null,
  });

  const onSubmit = async () => {
    const newElement: TCarItemCreate = {
      authorId: "1",
      description: description.value.toString(),
      name: nameElement.value.toString(),
      forSell,
      inUse,
      itemType: translateCarItemTypesToEnglish(carItemType),
      isVisible,
      projectId: "",
    };

    const { valid, notification } = validCarElement(newElement);

    if (valid) {
      const result = await createCarItem(newElement);

      if (result) {
        if (result.notification) {
          dispatch(addNotification(JSON.stringify(result.notification)));
        }
      }
    } else {
      if (notification) {
        dispatch(addNotification(JSON.stringify(notification)));
      }
    }
  };

  const handleCarItemVallue = (value: string | number) => {
    const _carItemType: any = value;
    setCarItemType(_carItemType);
  };

  return (
    <main
      className="flex justify-center text-custom-primary text-sm rounded-md"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-[250px] h-[11/12] p-3 pr-4 rounded-sm border-r border-zinc-700 ml-2">
        <div className="flex items-center">
          <AMPSelect
            value={carItemType}
            setValue={(value) => handleCarItemVallue(value)}
            options={itemTypesArray}
            title="Rodzaj elementu:"
            leftIcon={
              <IconFromItemType itemType={carItemType} isLoading={false} />
            }
          />
        </div>
        <div className="flex flex-col gap-2 mt-3 ">
          <h3 className="text-sm mb-1 text-teal-500 font-bold">
            Dodatkowe opcje:
          </h3>
          <AMPSwitch
            name="Element w użyciu?"
            setValue={setInUse}
            value={inUse}
          />
          <hr className="border-zinc-100 dark:border-zinc-800 w-full" />
          <AMPSwitch
            name="Element na sprzedaż?"
            setValue={setForSell}
            value={forSell}
          />
          <hr className="border-zinc-100 dark:border-zinc-800 w-full" />
          <AMPSwitch
            name="Element ma być widoczny dla wszystkich?"
            setValue={setIsVisible}
            additionalTailwindCss="w-[55px]"
            value={isVisible}
          />
          <hr className="border-zinc-100 dark:border-zinc-800 w-full" />

          <p className="text-custom-secend leading-3 text-[11px] mt-2">
            Po utworzeniu elementu można go edytować.
          </p>
        </div>
      </div>
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
          inputStyles={{ fontSize: 12 }}
          errorText={nameElement.errorText}
        />
        <AMPTextarea
          name="Opis elementu"
          setValue={(text) => setDescription({ value: text, errorText: "" })}
          value={description.value}
          placeholder="Np. Seryjna turbina, bez modyfikacji, orginalnie była w audi A3 8p "
          inputStyles={{ fontSize: 12, height: "150px" }}
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
