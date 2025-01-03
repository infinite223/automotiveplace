"use client";

import { useState } from "react";
import { AMPSeparator } from "@/app/components/shared/AMPSeparator";
import { endpointsWithNumberRunList, IEndpoint } from "./endpointsList ";
import { AMPInput } from "@/app/components/shared/AMPInput";
import { VscRunAll } from "react-icons/vsc";
import {
  createCarItem,
  getAllCarItems,
  removeCarItem,
} from "@/app/services/carItem";
import {
  generateRandomCarItems,
  generateRandomCarItemsToCreate,
  getCarItemsTestToRemove,
} from "@/app/utils/data/carItem";
import { useDispatch } from "react-redux";
import { addNotification } from "@/lib/features/notifications/notificationsSlice";
import { createProject } from "@/app/services/project";
import { getMainContentDataForUser } from "@/app/services/content";
import {
  generateRandomProjects,
  generateRandomProjectsToCreate,
} from "@/app/utils/data/project";
import { Notification } from "@/app/components/logger/Notification";
import { getGenerateStartData } from "@/app/services/data";

export default function Page() {
  const [endpointsWithNumberRun, setEndpointsWithNumberRun] = useState<
    IEndpoint[]
  >(endpointsWithNumberRunList);
  const dispatch = useDispatch();

  const handleInputChange = (index: number, value: number) => {
    const updatedEndpoints = [...endpointsWithNumberRun];
    updatedEndpoints[index] = {
      ...updatedEndpoints[index],
      runs: value,
    };
    setEndpointsWithNumberRun(updatedEndpoints);
  };

  const evaluateFunction = async ({ functionType, runs }: IEndpoint) => {
    switch (functionType) {
      case "CreateCarItemFunction":
        const randomCarItemsData = generateRandomCarItemsToCreate(runs);

        randomCarItemsData.forEach(async (carItemData) => {
          const result = await createCarItem(carItemData);
          console.log(result, "result");
          dispatch(addNotification(JSON.stringify(result.notification)));
        });

        break;

      case "RemoveCarItemFunction":
        const carItemsData = getCarItemsTestToRemove(runs);

        carItemsData.forEach(async (carItemData) => {
          const result = await removeCarItem(carItemData.id);

          dispatch(addNotification(JSON.stringify(result.notification)));
        });

        break;

      case "GetAllCarItemsFunction":
        const result = await getAllCarItems();

        dispatch(addNotification(JSON.stringify(result.notification)));

        break;

      case "CreateProjectFunction":
        const randomProjectsData = generateRandomProjectsToCreate(runs);

        randomProjectsData.forEach(async (project) => {
          const result = await createProject(project);

          dispatch(addNotification(JSON.stringify(result.notification)));
        });

        break;

      case "GetMainContentDataForUserFunction":
        const { data, hasMore } = await getMainContentDataForUser(1);

        if (data) {
          // dispatch(addNotification(JSON.stringify(result.notification)));
          console.log(data);
        }

        break;
      default:
        break;
    }
  };

  const evaluateFunctions = async () => {
    endpointsWithNumberRun.forEach((endpoint) => {
      evaluateFunction(endpoint);
    });
  };

  const generateBaseData = async () => {
    const result = await getGenerateStartData();

    dispatch(addNotification(JSON.stringify(result.notification)));
  };

  return (
    <main className="flex min-h-screen bg-amp-900 dark:bg-amp-0bg-amp-000 dark:bg-amp-900 flex-col items-center gap-2 p-2">
      {/* <Notification /> */}
      <div className="flex flex-col gap-3 w-full">
        <p className="text-sm font-semibold">
          Dane do każdego endpointu są generowane automatycznie
        </p>
        <div className="flex flex-wrap gap-2">
          {endpointsWithNumberRun.map((endpoint, index) => (
            <div
              key={endpoint.name}
              className="border-zinc-700 flex w-min min-w-[200px] justify-between flex-col gap-1  border p-4 rounded-sm text-sm"
            >
              <div className="flex flex-col gap-2">
                {endpoint.name}
                <span className="text-[12px] bg-amp-800 dark:bg-amp-100 leading-4">
                  {endpoint.description}
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <AMPInput
                  marginBotton="mb-0"
                  name="Ilość wywołań: "
                  type="number"
                  value={endpoint.runs}
                  setValue={(value) => handleInputChange(index, Number(value))}
                />
                <button
                  onClick={() => evaluateFunction(endpoint)}
                  className="bg-amp-800 dark:bg-amp-100 hover:opacity-85 py-1 px-4 font-bold rounded-sm text-[12px] uppercase"
                >
                  Run endpoint
                </button>
              </div>
            </div>
          ))}
        </div>
        <AMPSeparator />
        <div className="p-2 flex items-start flex-col gap-2">
          <nav>{/* Można dodać dodatkowe elementy nawigacji */}</nav>
          <button
            onClick={evaluateFunctions}
            className="bg-green-800 rounded-md hover:opacity-85 flex items-center gap-2 py-1 px-4 font-bold text-sm uppercase"
          >
            Run all endpoints
            <VscRunAll size={14} />
          </button>
          <button
            onClick={generateBaseData}
            className="bg-green-800 rounded-md hover:opacity-85 flex items-center gap-2 py-1 px-4 font-bold text-sm uppercase"
          >
            Generate base data for tests
            <VscRunAll size={14} />
          </button>
        </div>
        <AMPSeparator />
      </div>
    </main>
  );
}
