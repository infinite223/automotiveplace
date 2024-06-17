"use client";

import { TProject } from "@/app/utils/types/project";
import { useEffect, useState } from "react";

export const ProjectMiniView = ({ data }: { data: TProject }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!data) {
    return null;
  }

  return (
    <>
      {isClient ? (
        <div className="flex flex-col items-center">
          <nav>
            <p>
              {data.carMake} {data.model}
            </p>
          </nav>
          <p>{data.engineStockHp}</p>
          <h2>Projekt</h2>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
