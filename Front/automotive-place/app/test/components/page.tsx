"use client";

import { AMPSeparator } from "@/app/components/shared/AMPSeparator";
import { useState } from "react";
import { componentsList } from "./componentsList";

export default function Page() {
  const [selectElement, setSelectElement] = useState<null | JSX.Element>(null);
  const showAllComponents = () => {
    const allElements = () => {
      return (
        <div className="flex flex-wrap w-full gap-2">
          {componentsList.map((component, id) => (
            <div
              key={id}
              className="flex flex-col gap-1 p-1 border-2 dark:border-zinc-900 p-1"
            >
              {component.name}:{component.value}
            </div>
          ))}
        </div>
      );
    };

    setSelectElement(allElements);
  };
  return (
    <main className="flex min-h-screen bg-custom-primary text-custom-primary flex-col items-center gap-2 p-2">
      <div className="flex flex-col gap-3 w-full">
        <div className="flex flex-wrap gap-2">
          {componentsList.map(({ name, value, description }, id) => (
            <div
              key={id}
              onClick={() => setSelectElement(value)}
              className="border-zinc-700 flex max-w-[200px] flex-col gap-1 cursor-pointer border py-1 p-2 rounded-sm text-sm"
            >
              {name}
              <span className="text-[12px] text-custom-secendary leading-4">
                {description}
              </span>
            </div>
          ))}
        </div>
        <AMPSeparator />
        <div className="p-2 flex items-start flex-col gap-2">
          <nav>
            <button
              onClick={showAllComponents}
              className="bg-custom-secendary py-2 px-4 rounded-sm text-sm"
            >
              Pokaż wszystkie komponenty
            </button>
          </nav>
          <h3>Test component: </h3>
          {selectElement || (
            <p className="text-sm text-custom-secendary">
              Wybierz komponent aby przetestować
            </p>
          )}
        </div>
      </div>

      <footer></footer>
    </main>
  );
}
