import React, { useState } from "react";
import { AMPInput } from "./../shared/AMPInput";
import { validCarElement, validCarNameValue } from "./Validation";
import { AMPTextarea } from "../shared/AMPTextarea";
import { AMPHelpFooter } from "../shared/AMPHelpFooter";
import { createCarItem } from "@/app/services/carItem";
import { AMPSelect } from "../shared/AMPSelect";
import { IconFromItemType } from "../carItem/IconFromItemType";
import { AMPSwitch } from "../shared/AMPSwitch";
import { TCarItemCreate, itemTypesArray } from "@/app/utils/types/carItem";
import { useDispatch } from "react-redux";
import { addNotification } from "@/lib/features/notifications/notificationsSlice";
import { carItemCreateData } from "@/app/utils/data";
import { AMPTagsView } from "../shared/AMPTagsView";
import { useLocale } from "next-intl";

export const CreateCarItemView = () => {
  const dispatch = useDispatch();
  const t = useLocale();
  const [carItem, setCarItem] = useState<TCarItemCreate>(carItemCreateData);

  const onSubmit = async () => {
    const validResults = validCarElement(carItem);
    const findInValidResult = validResults.validResults.find(
      (result) => result.valid == false
    );

    if (!findInValidResult) {
      const result = await createCarItem(carItem);

      if (result) {
        if (result.notification) {
          dispatch(addNotification(JSON.stringify(result.notification)));
        }
      }
    } else {
      if (validResults.notification) {
        dispatch(addNotification(JSON.stringify(validResults.notification)));
      }
    }
  };

  const handleCarItemVallue = (value: string | number) => {
    const _carItemType: any = value;
    setCarItem({ ...carItem, itemType: _carItemType });
  };

  return (
    <main
      className="flex justify-center bg-amp-000 dark:bg-amp-900 text-sm rounded-md"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-[250px] h-[11/12] p-3 pr-4 rounded-sm border-r border-zinc-700 ml-2">
        <div className="flex items-center">
          <AMPSelect
            value={carItem.itemType}
            setValue={(value) => handleCarItemVallue(value)}
            options={itemTypesArray}
            title="Rodzaj elementu:"
            leftIcon={
              <IconFromItemType itemType={carItem.itemType} isLoading={false} />
            }
          />
        </div>
        <div className="flex flex-col gap-2 mt-3 ">
          <h3 className="text-sm mb-1 font-bold">Dodatkowe opcje:</h3>
          <AMPSwitch
            name="Element w użyciu?"
            setValue={(value) => setCarItem({ ...carItem, inUse: value })}
            value={carItem.inUse}
          />
          <hr className="border-zinc-100 dark:border-zinc-800 w-full" />
          <AMPSwitch
            name="Element na sprzedaż?"
            setValue={(value) => setCarItem({ ...carItem, forSell: value })}
            value={carItem.forSell}
          />
          <hr className="border-zinc-100 dark:border-zinc-800 w-full" />
          <AMPSwitch
            name="Element ma być widoczny dla wszystkich?"
            additionalTailwindCss="w-[48px]"
            setValue={(value) => setCarItem({ ...carItem, isVisible: value })}
            value={carItem.isVisible}
          />
          <hr className="border-zinc-100 dark:border-zinc-800 w-full" />
          <h3 className="text-sm mb-1 font-bold">Tagi:</h3>

          <AMPTagsView tags={carItem.tags} />
          <hr className="border-zinc-100 dark:border-zinc-800 w-full" />

          <p className="bg-amp-800 dark:bg-amp-100 leading-3 text-[11px] mt-2">
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
          setValue={(value) =>
            setCarItem({ ...carItem, name: value.toString() })
          }
          value={carItem.name}
          placeholder="Np. Turbina K03s"
          inputStyles={{ fontSize: 12 }}
          validFunction={validCarNameValue}
        />
        <AMPTextarea
          name="Opis elementu"
          setValue={(value) =>
            setCarItem({ ...carItem, description: value.toString() })
          }
          value={carItem.description}
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
