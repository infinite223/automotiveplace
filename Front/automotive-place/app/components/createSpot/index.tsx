import React, { useState } from "react";
import { AMPInput } from "./../shared/AMPInput";
import { AMPTextarea } from "../shared/AMPTextarea";
import { AMPHelpFooter } from "../shared/AMPHelpFooter";
import { useDispatch } from "react-redux";
import { spotData } from "@/app/utils/data";
import { TProblemCreate } from "@/app/utils/types/problem";
import { validSpot } from "./Validation";

export const CreateSpotView = () => {
  const dispatch = useDispatch();
  const [spot, setSpot] = useState<TProblemCreate>(spotData);

  const onSubmit = async () => {
    const { valid, notification } = validSpot(spot);

    // if (valid) {
    //   const result = await createProblem(problem);

    //   if (result) {
    //     if (result.notification) {
    //       dispatch(addNotification(JSON.stringify(result.notification)));
    //     }
    //   }
    // } else {
    //   if (notification) {
    //     dispatch(addNotification(JSON.stringify(notification)));
    //   }
    // }
  };

  //   const handleCarItemVallue = (value: string | number) => {
  //     const _carItemType: any = value;
  //     setCarItem({ ...carItem, itemType: _carItemType });
  //   };

  return (
    <main
      className="flex justify-center text-custom-primary text-sm rounded-md"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-[250px] h-[11/12] p-3 pr-4 rounded-sm border-r border-zinc-700 ml-2"></div>
      <form
        className="rounded-md p-2 pr-4 pl-4 flex flex-col max-w-lg group w-[300px]"
        noValidate
        action={onSubmit}
      >
        <AMPInput
          name="Nazwa elementu"
          setValue={(value) => setSpot({ ...spot, title: value.toString() })}
          value={spot.title}
          placeholder="Np. jakiś spot"
          inputStyles={{ fontSize: 12 }}
          //   validFunction={validCarNameValue}
        />
        <AMPTextarea
          name="Opis elementu"
          setValue={(value) =>
            setSpot({ ...spot, description: value.toString() })
          }
          value={spot.description}
          placeholder="Np. Seryjna turbina, bez modyfikacji, orginalnie była w audi A3 8p "
          inputStyles={{ fontSize: 12, height: "150px" }}
        />
        <button
          type="submit"
          className="mt-4 bg-teal-800 py-2 rounded-md text-white group-invalid:pointer-events-none group-invalid:opacity-50"
        >
          Dodaj spot
        </button>

        <AMPHelpFooter footerText="Czym jest spot?" />
      </form>
    </main>
  );
};
