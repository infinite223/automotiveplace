"use client";

import React, { FC } from "react";
import { LuSearch } from "react-icons/lu";
import { BiSolidCarGarage } from "react-icons/bi";
import { RiPlayListAddLine } from "react-icons/ri";
import { MdGroups, MdLiveHelp } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { MdHome } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setIsSearchBarOpen } from "@/lib/features/searchBar/searchBarSlice";
import { AMPSeparator } from "../components/shared/AMPSeparator";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdEventNote } from "react-icons/md";
import { RiBuildingFill } from "react-icons/ri";

interface IHomeLeftOptions {
  openModal: () => void;
  closeModal: () => void;
}

export const HomeLeftOptions: FC<IHomeLeftOptions> = ({
  closeModal,
  openModal,
}) => {
  const iconSize = 25;
  const dispatch = useDispatch();
  const smallScreenHiddenItem = "max-2xl:hidden";

  return (
    <div className="flex border-zinc-900 h-full scroll-smoot custom-scrollbar overflow-y-auto flex-col justify-between">
      <div className="flex flex-col gap-1  h-full pl-2 justify-between">
        <div className="flex flex-col items-start max-2xl:items-center max-2xl:pr-3 max-2xl:min-w-0 min-w-[170px]">
          <OptionItem
            icon={<MdHome size={iconSize} />}
            name="Główna"
            onClick={() => console.log("główna")}
          />
          <OptionItem
            icon={<LuSearch size={iconSize} />}
            name="Szukaj"
            additionalTailwindCss={smallScreenHiddenItem}
            onClick={() => dispatch(setIsSearchBarOpen(true))}
          />
          <AMPSeparator additionalTailwindCss={smallScreenHiddenItem} />

          <OptionItem
            icon={<RiPlayListAddLine size={iconSize} />}
            name="Dodaj"
            onClick={() => openModal()}
          />
          <OptionItem
            icon={<BiSolidCarGarage size={iconSize} />}
            name="Twój garaż"
            onClick={() => {}}
          />
          <AMPSeparator additionalTailwindCss={smallScreenHiddenItem} />

          <OptionItem
            icon={<MdGroups size={iconSize} />}
            name="Grupy"
            additionalTailwindCss={smallScreenHiddenItem}
            onClick={() => {}}
          />
          <OptionItem
            icon={<MdOutlineLocationOn size={iconSize} />}
            name="Spoty"
            additionalTailwindCss={smallScreenHiddenItem}
            onClick={() => {}}
          />
          <OptionItem
            icon={<MdEventNote size={iconSize} />}
            name="Wydarzenia"
            additionalTailwindCss={smallScreenHiddenItem}
            onClick={() => {}}
          />
          <OptionItem
            icon={<MdLiveHelp size={iconSize} />}
            name="Problemy"
            additionalTailwindCss={smallScreenHiddenItem}
            onClick={() => {}}
          />
          <OptionItem
            icon={<RiBuildingFill size={iconSize} />}
            name="Firmy"
            additionalTailwindCss={smallScreenHiddenItem}
            onClick={() => {}}
          />
        </div>

        <div className="flex flex-col items-start max-2xl:items-center mb-1 max-2xl:pr-3 max-2xl:min-w-0 min-w-[170px]">
          <OptionItem
            icon={<FiSettings size={iconSize} />}
            name="Ustawienia"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

const OptionItem: FC<{
  name: string;
  icon: any;
  onClick: () => void;
  additionalTailwindCss?: string;
}> = ({ icon, name, onClick, additionalTailwindCss }) => {
  return (
    <div
      className={`${additionalTailwindCss} flex-row gap-5 max-2xl:gap-2 max-2xl:flex-col p-2 pr-1 pl-1 hover:opacity-70 cursor-pointer flex items-center justify-center`}
      onClick={onClick}
    >
      <div className="text-custom-secend">{icon}</div>
      <div className="text-md max-2xl:text-[12px] text-center">{name}</div>
    </div>
  );
};
