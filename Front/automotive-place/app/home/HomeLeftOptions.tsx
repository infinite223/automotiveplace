"use client";

import React, { FC } from "react";
import { LuSearch } from "react-icons/lu";
import { BiSolidCarGarage } from "react-icons/bi";
import { RiPlayListAddLine } from "react-icons/ri";
import { MdGroups } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { MdHome } from "react-icons/md";

interface IHomeLeftOptions {
  openModal: () => void;
  closeModal: () => void;
}

export const HomeLeftOptions: FC<IHomeLeftOptions> = ({
  closeModal,
  openModal,
}) => {
  return (
    <div className="flex border-zinc-900 h-full overflow-y-auto scroll-smoot flex-col justify-between">
      <div className="flex flex-col gap-1  h-full pl-2">
        <div className="flex flex-col items-start">
          <OptionItem
            icon={<MdHome size={26} />}
            tooltip="Idź do strony głównej"
            name="Główna"
            onClick={() => console.log("główna")}
          />
          <OptionItem
            icon={<LuSearch size={25} />}
            tooltip="Odtwórz wyszukiwarkę"
            name="Szukaj"
            onClick={() => console.log("galo")}
          />
          <OptionItem
            icon={<RiPlayListAddLine size={25} />}
            name="Dodaj"
            tooltip="Dodaj projekt, element, spotkanie, problem motoryzacyjny"
            onClick={() => openModal()}
          />
          <OptionItem
            icon={<BiSolidCarGarage size={25} />}
            tooltip="Wejdź do swojego garażu"
            name="Garaż"
            onClick={() => {}}
          />
          <OptionItem
            icon={<MdGroups size={25} />}
            tooltip="Twoje grupy"
            name="Grupy"
            onClick={() => {}}
          />
        </div>
        <div className="flex flex-col items-start">
          <OptionItem
            icon={<FiSettings size={22} />}
            tooltip="Wejdź do ustawień"
            name="Ustawienia"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

const OptionItem: FC<{
  tooltip: string;
  name: string;
  row?: boolean;
  icon: any;
  onClick: () => void;
}> = ({ icon, name, tooltip, onClick, row = true }) => {
  return (
    <div
      className={`${row ? "flex-row gap-3" : "flex-col"} p-2 pr-1 pl-1 hover:opacity-70 cursor-pointer flex items-center justify-center gap-1`}
      data-tooltip-id="option-item"
      data-tooltip-content={tooltip}
      onClick={onClick}
    >
      {icon}
      <div className="text-[12px]">{name}</div>
    </div>
  );
};
