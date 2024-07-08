"use client";

import { CarItem } from "@/app/components/carItem";
import { CreateCarItemView } from "@/app/components/createCarItem";
import { CreateProblemView } from "@/app/components/createProblem";
import { CreateProjectView } from "@/app/components/createProject";
import { CreateSpotView } from "@/app/components/createSpot";
import { AMPButton } from "@/app/components/shared/AMPButton";
import { AMPFooterItem } from "@/app/components/shared/AMPFooterItem";
import { AMPHelpFooter } from "@/app/components/shared/AMPHelpFooter";
import { AMPInput } from "@/app/components/shared/AMPInput";
import { AMPMenu } from "@/app/components/shared/AMPMenu";
import { AMPSearch } from "@/app/components/shared/AMPSearch";
import { AMPSelect } from "@/app/components/shared/AMPSelect";
import { AMPSeparator } from "@/app/components/shared/AMPSeparator";
import { AMPSwitch } from "@/app/components/shared/AMPSwitch";
import { AMPTextarea } from "@/app/components/shared/AMPTextarea";
import { carItemData } from "@/app/utils/data";
import Link from "next/link";
import { useState } from "react";
import { Md1kPlus } from "react-icons/md";

export default function Page() {
  const [selectElement, setSelectElement] = useState<null | JSX.Element>(null);
  return (
    <main className="flex min-h-screen bg-custom-primary text-custom-primary flex-col items-center gap-2 p-2">
      <div className="flex flex-col gap-3 w-full">
        <div className="flex flex-wrap gap-2">
          {componentsList.map(({ name, value, description }) => (
            <div
              onClick={() => setSelectElement(value)}
              className="border-zinc-700 flex max-w-[200px] flex-col gap-1 cursor-pointer border py-1 p-2 rounded-sm text-sm"
            >
              {name}
              <span className="text-[12px] text-custom-secend leading-4">
                {description}
              </span>
            </div>
          ))}
        </div>
        <AMPSeparator />
        <div className="p-2 flex items-start flex-col gap-2">
          <h3>Test component: </h3>
          {selectElement || (
            <p className="text-sm text-custom-secend">
              Wybierz komponent aby przetestować
            </p>
          )}
        </div>
      </div>

      <footer></footer>
    </main>
  );
}

export const componentsList = [
  {
    name: "CarItem",
    value: (
      <CarItem data={carItemData} isLoading={false} tableView="elements" />
    ),
    description:
      "Komponent który pokazuje pojedyńczy element samochodu, podzespół, jakąś część",
  },
  {
    name: "createCarItem",
    value: <CreateCarItemView />,
    description:
      "Widok który daje możliwość dodania do bazy elementu, część samochodowej",
  },
  {
    name: "createProblem",
    value: <CreateProblemView />,
    description: "Widok który daje możliwość dodania do bazy problemów",
  },
  {
    name: "createProject",
    value: <CreateProjectView />,
    description: "Widok który daje możliwość dodania do bazy projektu",
  },
  {
    name: "createSpot",
    value: <CreateSpotView />,
    description: "Widok który daje możliwość dodania do bazy spotu",
  },
  {
    name: "AMPButton",
    value: <AMPButton name="Nazwa" onClick={() => {}} />,
    description: "Customowy przycisk",
  },
  {
    name: "AMPFooterItem",
    value: (
      <AMPFooterItem
        data={{ createdAt: new Date(), likesCount: 2 }}
        isLoading={false}
        tableView="elements"
      />
    ),
    description: "Customowy footer",
  },
  {
    name: "AMPHelpFooter",
    value: <AMPHelpFooter footerText="Footer text" />,
    description: "Customowy footer do pomocy, informacyjny",
  },
  {
    name: "AMPInput",
    value: (
      <AMPInput
        name="Input"
        setValue={() => {}}
        value={""}
        placeholder="Custom input"
      />
    ),
    description: "Customowy input",
  },
  {
    name: "AMPMenu",
    value: (
      <AMPMenu
        isLoading={false}
        items={[{ name: "El 1" }, { name: "El 2", icon: <Md1kPlus /> }]}
      />
    ),
    description: "Menu",
  },
  {
    name: "AMPSearch",
    value: <AMPSearch isLoading={false} onSearch={() => {}} />,
    description: "Customowy search",
  },
  {
    name: "AMPSeparator",
    value: <AMPSeparator />,
    description: "Separator do oddzielania kontentu",
  },
  {
    name: "AMPSelect",
    value: (
      <AMPSelect
        options={[{ label: "label 1", value: "value 1" }]}
        setValue={() => {}}
        value={""}
        title="AMPSelect"
      />
    ),
    description: "Customowy select",
  },
  {
    name: "AMPSwitch",
    value: <AMPSwitch name="Switch" setValue={() => {}} value={true} />,
    description: "Customowy switch",
  },
  {
    name: "AMPTextarea",
    value: <AMPTextarea name="textarea" setValue={() => {}} value={""} />,
    description: "Customowy textarea",
  },
];
