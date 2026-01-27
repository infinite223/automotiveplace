"use client";

import { CarItem } from "@/app/components/carItem";
import { AMPSeparator } from "@/app/components/shared/AMPSeparator";
import AMPSlider from "@/app/components/shared/AMPSlider";
import { EngineParameter } from "@/app/utils/enums";
import { formatNumber } from "@/app/utils/helpers/numbersHelper";
import { sortStagesByStageNumber } from "@/app/utils/helpers/stagesHelper";
import { TStage } from "@/app/utils/types/stage";
import moment from "moment";
import { Tooltip } from "react-tooltip";

interface StagesTabProps {
  stages: TStage[];
}

function hasValue(v: string | number | undefined) {
  if (v === undefined || v === null) return false;
  const num = Number(String(v).replace(/[^\d.-]/g, ""));
  return !isNaN(num) && num > 0;
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
                className="flex-shrink-0 w-[290px] bg-amp-900 dark:bg-amp-50 rounded-small divide-y divide-amp-200 dark:divide-subtle-dark/20 shadow-sm px-4 py-3"
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
                    baseValue={baseStage.hp}
                  />
                  <Item
                    label="Moment obrotowy"
                    value={`${stage.nm} ${EngineParameter.TorqueNm}`}
                    difference={!isBase ? stage.nm - baseStage.nm : undefined}
                    baseValue={baseStage.nm}
                  />
                  <Item
                    label="0–100 km/h"
                    description="Przyspieszenie"
                    value={`${formatNumber(stage.acc_0_100)} s`}
                    difference={
                      !isBase
                        ? baseStage.acc_0_100 - stage.acc_0_100
                        : undefined
                    }
                  />
                  <Item
                    label="100–200 km/h"
                    description="Przyspieszenie"
                    value={`${formatNumber(stage.acc_100_200)} s`}
                    difference={
                      !isBase
                        ? baseStage.acc_100_200 - stage.acc_100_200
                        : undefined
                    }
                  />
                  <Item
                    label="50–150 km/h"
                    description="Przyspieszenie"
                    value={`${formatNumber(stage.acc_50_150)} s`}
                    difference={
                      !isBase
                        ? baseStage.acc_50_150 - stage.acc_50_150
                        : undefined
                    }
                  />

                  {stage.sl_100_0 && (
                    <Item
                      label="100–0 km/h"
                      description="Droga hamowania"
                      value={`${formatNumber(stage.sl_100_0)} s`}
                      difference={
                        !isBase
                          ? (baseStage.sl_100_0 ? baseStage.sl_100_0 : 0) -
                            stage.sl_100_0
                          : undefined
                      }
                    />
                  )}

                  {stage.sl_150_50 && (
                    <Item
                      label="150–50 km/h"
                      description="Droga hamowania"
                      value={`${formatNumber(stage.sl_150_50)} s`}
                      difference={
                        !isBase
                          ? (baseStage.sl_150_50 ? baseStage.sl_150_50 : 0) -
                            stage.sl_150_50
                          : undefined
                      }
                    />
                  )}

                  {stage.maxRPM && baseStage.maxRPM && (
                    <Item
                      label="Max RPM"
                      value={`${formatNumber(stage.maxRPM)} RPM`}
                      difference={
                        !isBase ? stage.maxRPM - baseStage.maxRPM : undefined
                      }
                    />
                  )}

                  <AMPSeparator additionalTailwindCss="h-[1px]" />

                  {stage.carItems && stage.carItems.length > 0 && (
                    <div className="pt-1">
                      <h4 className="text-sm text-subtle-light dark:text-subtle-dark opacity-80 mb-2">
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
                      <div className="w-full h-[160px] overflow-hidden  border border-amp-200 dark:border-subtle-dark/30">
                        <AMPSlider images={[stage.chartImageUrl]} />
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
  description?: string;
  value: string | number | undefined;
  difference?: number;
  baseValue?: number;
};

function Item({ label, description, value, difference, baseValue }: ItemProps) {
  if (!hasValue(value)) return null;

  if (!value) return null;

  const diffPercent =
    difference !== undefined && baseValue !== undefined && baseValue !== 0
      ? Math.round((Math.abs(difference) / baseValue) * 100)
      : null;

  const isOver40Percent = diffPercent !== null && diffPercent >= 40;

  const formattedDiff =
    difference !== undefined && !isNaN(difference)
      ? difference > 0
        ? `(+${formatNumber(difference)})`
        : `(${formatNumber(difference)})`
      : null;

  const tooltipId = `value-diff-${label.replace(/\s+/g, "-")}`;

  return (
    <div className="flex justify-between py-1.5">
      <div className="flex flex-col">
        <p className="text-subtle-light dark:text-subtle-dark">{label}</p>
        {description && (
          <span className="text-xs text-subtle-light/70 dark:text-subtle-dark/70">
            {description}
          </span>
        )}
      </div>

      <p className="font-medium text-right">
        {value}
        {formattedDiff && (
          <span
            className={`ml-1 cursor-pointer ${
              isOver40Percent
                ? "text-red-500 font-semibold"
                : "text-muted-foreground"
            }`}
            data-tooltip-id={tooltipId}
            data-tooltip-content={
              diffPercent !== null
                ? `Dzięki modyfikacji udało się podnieść wartość od oryginalnej o ${diffPercent}%`
                : undefined
            }
          >
            {formattedDiff}
          </span>
        )}
      </p>

      {diffPercent !== null && (
        <Tooltip
          id={tooltipId}
          style={{ fontSize: "11px", maxWidth: "220px" }}
        />
      )}
    </div>
  );
}
