"use client";

import { TBasicHistory } from "@/app/utils/types/history";
import { BiCalendar, BiWrench } from "react-icons/bi";
import { FaGauge } from "react-icons/fa6";
import { LuBuilding2, LuCircleDollarSign } from "react-icons/lu";
import moment from "moment";
import "moment/locale/pl";
import HistoryChart from "./HistoryChart";

interface HistoryTabProps {
  history: TBasicHistory[];
}

export default function HistoryTab({ history }: HistoryTabProps) {
  if (!history || history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 opacity-50 border-2 border-dashed border-amp-700 rounded-xl">
        <BiWrench size={48} className="mb-4" />
        <p className="text-lg">Brak wpisów w historii pojazdu</p>
      </div>
    );
  }

  return (
    <div className="mx-auto py-4 w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Historia pojazdu</h2>
          <p className="text-amp-800 text-sm">
            Chronologiczny zapis serwisów i modyfikacji
          </p>
        </div>
      </div>

      <HistoryChart history={history} />

      <div className="relative border-l-[1px] mt-3 border-amp-700/70  ml-4 md:ml-6">
        {history.map((h, index) => (
          <div key={h.id} className="mb-5 ml-6 md:ml-10 relative">
            <div className="absolute -left-[31px] md:-left-[48px] mt-1.5 w-4 h-4 rounded-full border-4 border-amp-700 bg-amp-500 shadow-[0_0_12px_rgba(219,31,72,0.4)]" />

            <div className="bg-amp-900 dark:bg-amp-100 rounded-md p-5 hover:border-amp-500/50 transition-colors">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-white uppercase tracking-wide">
                    {h.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-amp-300 dark:text-amp-800/80">
                    <span className="flex items-center gap-1.5">
                      <BiCalendar size={14} className="text-amp-500" />
                      {moment(h.date).format("D MMMM YYYY")}{" "}
                    </span>
                    <span className="flex items-center gap-1.5 text-white font-medium bg-amp-300 px-2 py-1 rounded">
                      <FaGauge size={14} className="text-amp-500" />
                      {h.mileage.toLocaleString()} km
                    </span>
                  </div>
                </div>

                {h.price && (
                  <div className="flex items-center gap-1.5 bg-green-500/10 text-green-500 px-3 py-1 rounded-full border border-green-500/20 text-sm font-semibold">
                    <LuCircleDollarSign size={16} />
                    {h.price.toLocaleString()} zł
                  </div>
                )}
              </div>

              {h.description && (
                <p className="text-amp-200 text-sm leading-relaxed mb-4 whitespace-pre-wrap">
                  {h.description}
                </p>
              )}

              {h.company && (
                <div className="flex items-center gap-3 pt-4 border-t border-amp-700/50">
                  <div className="w-8 h-8 rounded bg-amp-700 flex items-center justify-center overflow-hidden">
                    {h.company.imagesUrl ? (
                      <img
                        src={h.company.imagesUrl}
                        alt={h.company.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <LuBuilding2 size={16} className="text-amp-400" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-amp-400 font-bold tracking-tighter">
                      Wykonano w
                    </span>
                    <span className="text-xs text-white font-semibold">
                      {h.company.name}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
