"use client";

import { useState } from "react";
import { AMPSeparator } from "@/app/components/shared/AMPSeparator";
import { endpointsWithNumberRunList, IEndpoint } from "./endpointsList ";
import { AMPInput } from "@/app/components/shared/AMPInput";

export default function Page() {
  const [endpointsWithNumberRun, setEndpointsWithNumberRun] = useState<
    IEndpoint[]
  >(endpointsWithNumberRunList);

  const handleInputChange = (index: number, value: number) => {
    const updatedEndpoints = [...endpointsWithNumberRun];
    updatedEndpoints[index] = {
      ...updatedEndpoints[index],
      runs: value,
    };
    setEndpointsWithNumberRun(updatedEndpoints);
  };

  const evaluateFunction = async () => {
    // Logika do wywoływania endpointu
  };

  return (
    <main className="flex min-h-screen bg-custom-primary text-custom-primary flex-col items-center gap-2 p-2">
      <div className="flex flex-col gap-3 w-full">
        <div className="flex flex-wrap gap-2">
          {endpointsWithNumberRun.map((endpoint, index) => (
            <div
              key={endpoint.name}
              className="border-zinc-700 flex max-w-[200px] justify-between flex-col gap-1 cursor-pointer border p-4 rounded-sm text-sm"
            >
              <div className="flex flex-col gap-2">
                {endpoint.name}
                <span className="text-[12px] text-custom-secend leading-4">
                  {endpoint.description}
                </span>
              </div>

              <AMPInput
                marginBotton="mb-0"
                name="Ilość wywołań: "
                type="number"
                value={endpoint.runs}
                setValue={(value) => handleInputChange(index, Number(value))}
              />
            </div>
          ))}
        </div>
        <AMPSeparator />
        <div className="p-2 flex items-start flex-col gap-2">
          <nav>{/* Można dodać dodatkowe elementy nawigacji */}</nav>
          <h3>Test endpoint: </h3>
          <button
            onClick={evaluateFunction}
            className="bg-red-800 py-1 px-4 rounded-sm uppercase"
          >
            Run all endpoint
          </button>
          {/* Tutaj można dodać przycisk i inputy generowane automatycznie z typu */}
        </div>
      </div>
    </main>
  );
}
