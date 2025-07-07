"use client";

import { TStage } from "@/app/utils/types/stage";
import moment from "moment";

interface StagesTabProps {
  stages: TStage[];
}

export default function StagesTab({ stages }: StagesTabProps) {
  return (
    <div>
      <h2>Aktualny etap modyfikacji: Stage 2</h2>

      <div>
        {stages.map((stage) => (
          <div
            key={stage.id}
            className="bg-amp-50 w-fit p-2 px-4 flex flex-col gap-1 mt-4"
          >
            <h2 className="font-semibold text-lg mb-2">{stage.name}</h2>

            <LabelValueRow label="Numer etapu:" value={stage.stageNumber} />
            <LabelValueRow label="Opis:" value={stage.description} />
            <LabelValueRow label="Moc silnika:" value={stage.hp} tip="HP" />
            <LabelValueRow label="Moment obrotowy:" value={stage.nm} tip="Nm" />
            <LabelValueRow
              label="0–100 km/h:"
              value={stage.acc_0_100}
              tip="s"
            />
            <LabelValueRow
              label="100–200 km/h:"
              value={stage.acc_100_200}
              tip="s"
            />
            <LabelValueRow
              label="50–150 km/h:"
              value={stage.acc_50_150}
              tip="s"
            />
            <LabelValueRow label="Cena:" value={stage.stagePrice} tip="zł" />
            <LabelValueRow
              label="Dodano:"
              value={moment(stage.createdAt, "YYYYMMDD").fromNow()}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

type LabelValueRowProps = {
  label: string;
  value: string | number | undefined;
  tip?: string;
};

const LabelValueRow = ({ label, value, tip }: LabelValueRowProps) => {
  if (!value) return;
  return (
    <div className="flex justify-between opacity-85 gap-2 text-sm">
      <span className="opacity-75">{label}</span>
      <span className="font-medium">
        {value}
        {tip && <span className="text-sm opacity-80 ml-1">{tip}</span>}
      </span>
    </div>
  );
};
