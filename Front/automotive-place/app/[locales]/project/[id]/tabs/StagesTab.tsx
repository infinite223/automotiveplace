"use client";

import { CarItem } from "@/app/components/carItem";
import { AMPSeparator } from "@/app/components/shared/AMPSeparator";
import { EngineParameter } from "@/app/utils/enums";
import { formatNumber } from "@/app/utils/helpers/numbersHelper";
import { sortStagesByStageNumber } from "@/app/utils/helpers/stagesHelper";
import { TStage } from "@/app/utils/types/stage";
import moment from "moment";

interface StagesTabProps {
  stages: TStage[];
}

export default function StagesTab({ stages }: StagesTabProps) {
  const sortedStages = sortStagesByStageNumber(stages);
  const baseStage = sortedStages[sortedStages.length - 1];

  return (
    <div className="mt-2 space-y-4 relative">
      <div className="flex items-center gap-3 px-2">
        <h3 className="text-lg font-bold">Etapy modyfikacji</h3>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <div className="flex gap-6 min-w-max pb-4">
          {sortedStages.map((stage, index) => {
            const isBase = index === sortedStages.length - 1;

            return (
              <div
                key={stage.id}
                className="flex-shrink-0 w-[290px] bg-amp-900 dark:bg-amp-100 rounded-xl divide-y divide-amp-200 dark:divide-subtle-dark/20 shadow-sm px-4 py-3"
              >
                <div className="pb-2">
                  <h2 className="font-semibold text-lg text-text-light dark:text-text-dark">
                    {stage.name}
                  </h2>
                  <p className="text-sm text-subtle-light dark:text-subtle-dark opacity-80">
                    {!isBase ? (
                      <>
                        Dodano {moment(stage.createdAt, "YYYYMMDD").fromNow()}
                      </>
                    ) : (
                      <>Seryjne parametry pojazdu</>
                    )}
                  </p>
                </div>

                <div className="pt-2">
                  {stage.description && (
                    <p className="text-sm text-subtle-light dark:text-subtle-dark opacity-80 mb-1">
                      {stage.description}
                    </p>
                  )}
                  <Item
                    label="Moc silnika"
                    value={`${stage.hp} ${EngineParameter.PowerPs}`}
                    difference={!isBase ? stage.hp - baseStage.hp : undefined}
                  />
                  <Item
                    label="Moment obrotowy"
                    value={`${stage.nm} ${EngineParameter.TorqueNm}`}
                    difference={!isBase ? stage.nm - baseStage.nm : undefined}
                  />
                  <Item
                    label="0–100 km/h"
                    value={`${formatNumber(stage.acc_0_100)} s`}
                    difference={
                      !isBase
                        ? baseStage.acc_0_100 - stage.acc_0_100
                        : undefined
                    }
                  />
                  <Item
                    label="100–200 km/h"
                    value={`${formatNumber(stage.acc_100_200)} s`}
                    difference={
                      !isBase
                        ? baseStage.acc_100_200 - stage.acc_100_200
                        : undefined
                    }
                  />
                  <Item
                    label="50–150 km/h"
                    value={`${formatNumber(stage.acc_50_150)} s`}
                    difference={
                      !isBase
                        ? baseStage.acc_50_150 - stage.acc_50_150
                        : undefined
                    }
                  />
                  {stage.maxRPM && baseStage.maxRPM && (
                    <Item
                      label="Max RPM"
                      value={`${formatNumber(stage.maxRPM)} RPM`}
                      difference={
                        !isBase ? stage.maxRPM - baseStage.maxRPM : undefined
                      }
                    />
                  )}

                  {stage.carItems && stage.carItems.length > 0 && (
                    <div className="pt-3">
                      <h4 className="font-semibold text-sm text-text-light dark:text-text-dark mb-2">
                        Części użyte w tym etapie:
                      </h4>
                      <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto custom-scrollbar">
                        {stage.carItems.map((item) => (
                          <>
                            <CarItem
                              key={item.id}
                              data={item}
                              isLoading={false}
                              tableView="elements"
                              lineClamp={2}
                              showFullView={false}
                              addCarItemTailwindStyles="px-0 py-1"
                            />
                            <AMPSeparator />
                          </>
                        ))}
                      </div>
                    </div>
                  )}

                  {stage.chartImageUrl && (
                    <div className="pt-4">
                      <h4 className="font-semibold text-sm text-text-light dark:text-text-dark mb-2">
                        Wykres z hamowni:
                      </h4>
                      <div className="w-full h-[160px] overflow-hidden rounded-md border border-amp-200 dark:border-subtle-dark/30">
                        <img
                          src={stage.chartImageUrl}
                          alt={`Wykres z hamowni - ${stage.name}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {stage.stagePrice && (
                    <Item
                      label="Koszt modyfikacji"
                      value={`${stage.stagePrice} zł`}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

type ItemProps = {
  label: string;
  value: string | number | undefined;
  difference?: number;
};

function Item({ label, value, difference }: ItemProps) {
  if (!value) return null;

  const formattedDiff =
    difference !== undefined && !isNaN(difference)
      ? difference > 0
        ? `(+${formatNumber(difference)})`
        : `(${formatNumber(difference)})`
      : null;

  return (
    <div className="flex justify-between py-2">
      <p className="text-subtle-light dark:text-subtle-dark">{label}</p>
      <p className="font-medium text-right">
        {value}{" "}
        {formattedDiff && (
          <span className="text-muted-foreground ml-1">{formattedDiff}</span>
        )}
      </p>
    </div>
  );
}
