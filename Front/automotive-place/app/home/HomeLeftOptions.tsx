"use client";

import React, { FC } from "react";
import { LuSearch } from "react-icons/lu";
import { BiSolidCarGarage } from "react-icons/bi";
import { RiPlayListAddLine } from "react-icons/ri";
import { MdGroups } from "react-icons/md";
import { FiSettings } from "react-icons/fi";

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
      <div className="flex flex-col gap-1 justify-around h-full">
        <div className="flex flex-col">
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
        <div className="flex flex-col">
          <OptionItem
            icon={<FiSettings size={25} />}
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
  icon: any;
  onClick: () => void;
}> = ({ icon, name, tooltip, onClick }) => {
  return (
    <div
      className="p-2 pr-1 pl-1 hover:opacity-70 cursor-pointer flex items-center justify-center flex-col gap-1"
      data-tooltip-id="option-item"
      data-tooltip-content={tooltip}
      onClick={onClick}
    >
      {icon}
      <div className="text-[10px]">{name}</div>
    </div>
  );
};
