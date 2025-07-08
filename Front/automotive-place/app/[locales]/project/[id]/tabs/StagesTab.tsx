"use client";

import { formatNumber, sortStagesByStageNumber } from "@/app/utils/helpers";
import { TStage } from "@/app/utils/types/stage";
import moment from "moment";

interface StagesTabProps {
  stages: TStage[];
}

export default function StagesTab({ stages }: StagesTabProps) {
  const sortedStages = sortStagesByStageNumber(stages);
  const baseStage = sortedStages[sortedStages.length - 1];

  return (
    <div>
      <h2>Aktualny etap modyfikacji: Stage 2</h2>

      <div className="overflow-x-auto custom-scrollbar">
        <div className="flex gap-4 min-w-max">
          {sortedStages.map((stage, index) => {
            const isBase = index === sortedStages.length - 1;

            return (
              <div
                key={stage.id}
                className="bg-amp-50 w-[250px] flex-shrink-0 p-2 px-4 flex flex-col gap-1 mt-4 rounded-lg shadow-sm"
              >
                <h2 className="font-semibold text-lg mb-1">{stage.name}</h2>

                <LabelValueRow label="Opis:" value={stage.description} />
                <LabelValueRow
                  label="Moc silnika:"
                  value={stage.hp}
                  tip="HP"
                  difference={!isBase ? stage.hp - baseStage.hp : undefined}
                />
                <LabelValueRow
                  label="Moment obrotowy:"
                  value={stage.nm}
                  tip="Nm"
                  difference={!isBase ? stage.nm - baseStage.nm : undefined}
                />
                <LabelValueRow
                  label="0–100 km/h:"
                  value={formatNumber(stage.acc_0_100)}
                  tip="s"
                  difference={
                    !isBase ? baseStage.acc_0_100 - stage.acc_0_100 : undefined
                  }
                />
                <LabelValueRow
                  label="100–200 km/h:"
                  value={formatNumber(stage.acc_100_200)}
                  tip="s"
                  difference={
                    !isBase
                      ? baseStage.acc_100_200 - stage.acc_100_200
                      : undefined
                  }
                />
                <LabelValueRow
                  label="50–150 km/h:"
                  value={formatNumber(stage.acc_50_150)}
                  tip="s"
                  difference={
                    !isBase
                      ? baseStage.acc_50_150 - stage.acc_50_150
                      : undefined
                  }
                />
                <LabelValueRow
                  label="Koszty modyfikacji:"
                  value={stage.stagePrice}
                  tip="zł"
                />

                {!isBase && (
                  <span className="text-sm opacity-65 pt-2 mt-auto">
                    Modyfikacje dodano:{" "}
                    {moment(stage.createdAt, "YYYYMMDD").fromNow()}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

type LabelValueRowProps = {
  label: string;
  value: string | number | undefined;
  tip?: string;
  difference?: number;
};

const LabelValueRow = ({
  label,
  value,
  tip,
  difference,
}: LabelValueRowProps) => {
  if (value === undefined || value === null) return null;

  const formattedDiff =
    difference !== undefined && !isNaN(difference)
      ? difference > 0
        ? `(+${formatNumber(difference)})`
        : `(${formatNumber(difference)})`
      : null;

  return (
    <div className="flex justify-between opacity-85 gap-2 text-sm">
      <span className="opacity-75">{label}</span>
      <span className="font-medium">
        {value}
        {formattedDiff && (
          <span className="text-muted-foreground">{formattedDiff}</span>
        )}

        {tip && <span className="text-sm opacity-80 ml-1">{tip}</span>}
      </span>
    </div>
  );
};
