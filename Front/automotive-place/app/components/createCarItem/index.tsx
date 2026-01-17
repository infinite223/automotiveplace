import React, { useEffect, useState } from "react";
import { AMPInput } from "./../shared/AMPInput";
import { validCarElement } from "./Validation";
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
import { useLocale } from "next-intl";
import { AMPButton } from "../shared/AMPButton";
import { createCarItemSchema } from "@/app/api/zod.schmas";
import { ZodIssue } from "zod";

interface Props {
  onSubmitLocal?: (item: TCarItemCreate) => void;
  onCancel?: () => void;
}

export const CreateCarItemView = ({ onCancel, onSubmitLocal }: Props) => {
  const dispatch = useDispatch();
  const t = useLocale();
  const [carItem, setCarItem] = useState<TCarItemCreate>(carItemCreateData);
  const [errors, setErrors] = useState<ZodIssue[] | null>(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const result = createCarItemSchema.safeParse({
      ...carItem,
      name: carItem.name?.trim() ? carItem.name : undefined,
      tags: [],
    });

    setIsValid(result.success);

    if (!result.success) setErrors(result.error.errors);
    else setErrors(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carItem]);

  const onSubmit = async () => {
    if (!isValid) {
      dispatch(
        addNotification(
          JSON.stringify({
            type: "error",
            message: "Popraw błędy formularza",
          }),
        ),
      );
      return;
    }

    const payload = {
      ...carItem,
      name: carItem.name?.trim() ? carItem.name : undefined,
      tags: [],
    };

    if (onSubmitLocal) {
      onSubmitLocal(payload);
      return;
    }

    await createCarItem(payload);
  };

  const handleCarItemVallue = (value: string | number) => {
    const _carItemType: any = value;
    setCarItem({ ...carItem, itemType: _carItemType });
  };

  return (
    <main
      className="
      flex
      flex-col-reverse
      md:flex-row
      text-sm
      rounded-md
      max-h-[100dvh]
      overflow-auto
      px-2
    "
      onClick={(e) => e.stopPropagation()}
    >
      <form
        className="
        order-1
        md:order-2
        flex
        flex-col
        flex-1
        p-3
        md:p-4
        group
        md:w-[250px]
        pb-24
      "
        noValidate
      >
        <AMPInput
          name="Nazwa elementu"
          setValue={(value) =>
            setCarItem({ ...carItem, name: value.toString() })
          }
          value={carItem.name ?? ""}
          placeholder="Np. Turbina K03s"
          inputStyles={{ fontSize: 12 }}
          error={errors?.find((e) => e.path.includes("name"))?.message}
        />

        <AMPTextarea
          name="Opis elementu"
          setValue={(value) =>
            setCarItem({ ...carItem, description: value.toString() })
          }
          value={carItem.description}
          placeholder="Np. Seryjna turbina, bez modyfikacji..."
          inputStyles={{ fontSize: 12, height: "150px" }}
          error={errors?.find((e) => e.path.includes("description"))?.message}
        />

        <div className="mt-auto sticky bottom-0 bg-custom-primary pt-4">
          <AMPButton
            type="primary"
            additionalTailwindCss="justify-center w-full"
            name="Dodaj element"
            onClick={onSubmit}
            disabled={!isValid}
          />
        </div>

        <AMPHelpFooter footerText="Czym jest element?" />
      </form>

      <div
        className="
        order-2
        md:order-1
        w-full
        md:w-[250px]
        p-3
        md:pr-4
        rounded-sm
        md:border-r
        border-zinc-700
      "
      >
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

        <div className="flex flex-col gap-3 mt-3">
          <h3 className="text-sm mb-1 font-bold">Dodatkowe opcje:</h3>
          <hr className="border-zinc-100 dark:border-zinc-800 w-full" />

          <AMPSwitch
            name="Element w użyciu?"
            setValue={(value) => setCarItem({ ...carItem, inUse: value })}
            value={carItem.inUse}
          />

          <AMPSwitch
            name="Element na sprzedaż?"
            setValue={(value) => setCarItem({ ...carItem, forSell: value })}
            value={carItem.forSell}
          />

          <AMPSwitch
            name="Element ma być widoczny dla wszystkich?"
            setValue={(value) => setCarItem({ ...carItem, isVisible: value })}
            value={carItem.isVisible}
          />

          <hr className="border-zinc-100 dark:border-zinc-800 w-full" />

          <p className="bg-amp-800 dark:bg-amp-100 leading-3 text-[11px] mt-2">
            Po utworzeniu elementu można go edytować.
          </p>
        </div>
      </div>
    </main>
  );
};
