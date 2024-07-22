import React, { useState } from "react";
import { AMPInput } from "./../shared/AMPInput";
import { AMPTextarea } from "../shared/AMPTextarea";
import { AMPHelpFooter } from "../shared/AMPHelpFooter";
import { TStageCreate } from "@/app/utils/types/stage";
import { validStages } from "../createProject/Validation";
import { stageCreateData } from "@/app/utils/data";
import { createStage } from "@/app/services/stage";

export const CreateStageView = () => {
  const [stage, setStage] = useState<TStageCreate>(stageCreateData);

  const onSubmit = () => {
    const validResults = validStages([stage]);
    const findInValidResult = validResults.every(
      (result) => result.valid == false
    );

    if (!findInValidResult) {
      const result = createStage(stage);
      console.log(result);
    } else {
      validResults.map((res) => {
        throw new Error(res.error);
      });
    }
  };

  return (
    <main
      className="flex justify-center text-custom-primary text-sm rounded-md"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-[200px] h-[11/12] p-3 mr-0 rounded-sm border-r border-zinc-700 ml-2"></div>
      <form
        className="rounded-md p-2 pr-4 pl-4 flex flex-col max-w-lg group w-[300px]"
        noValidate
        action={onSubmit}
      >
        <AMPInput
          name="Nazwa etapu"
          setValue={(value) => setStage({ ...stage, name: value.toString() })}
          value={stage.name}
          placeholder="Np. Turbina K03s"
          inputStyles={{ fontSize: 12 }}
          //   validFunction={validCarNameValue}
        />
        <AMPTextarea
          name="Opis etapu"
          setValue={(value) =>
            setStage({ ...stage, description: value.toString() })
          }
          value={stage.description}
          placeholder="Np. Seryjna turbina, bez modyfikacji, orginalnie była w audi A3 8p "
          inputStyles={{ fontSize: 12, height: "150px" }}
        />
        <button
          type="submit"
          className="mt-4 bg-teal-800 py-2 rounded-md text-white group-invalid:pointer-events-none group-invalid:opacity-50"
        >
          Dodaj etap modyfikacji
        </button>

        <AMPHelpFooter footerText="Czym jest etap modyfikacji?" />
      </form>
    </main>
  );
};
