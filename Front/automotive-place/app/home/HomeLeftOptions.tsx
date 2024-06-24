"use client";

import React, { FC } from "react";
import { LuSearch } from "react-icons/lu";
import { BiSolidCarGarage } from "react-icons/bi";
import { RiPlayListAddLine } from "react-icons/ri";
import { MdGroups } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { MdHome } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setIsSearchBarOpen } from "@/lib/features/searchBar/searchBarSlice";
import { AMPSeparator } from "../components/shared/AMPSeparator";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdEventNote } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import { LuBuilding2 } from "react-icons/lu";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsBuildingUp } from "react-icons/bs";

interface IHomeLeftOptions {
  openModal: () => void;
  closeModal: () => void;
}

export const HomeLeftOptions: FC<IHomeLeftOptions> = ({
  closeModal,
  openModal,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="flex border-zinc-900 h-full overflow-y-auto scroll-smoot flex-col justify-between">
      <div className="flex flex-col gap-1  h-full pl-2 justify-between">
        <div className="flex flex-col items-start">
          <OptionItem
            icon={<MdHome size={26} />}
            name="Główna"
            onClick={() => console.log("główna")}
          />
          <OptionItem
            icon={<LuSearch size={25} />}
            name="Szukaj"
            onClick={() => dispatch(setIsSearchBarOpen(true))}
          />
          <AMPSeparator />

          <OptionItem
            icon={<RiPlayListAddLine size={25} />}
            name="Dodaj"
            onClick={() => openModal()}
          />
          <OptionItem
            icon={<BiSolidCarGarage size={25} />}
            name="Twój garaż"
            onClick={() => {}}
          />
          <AMPSeparator />

          <OptionItem
            icon={<MdGroups size={26} />}
            name="Grupy"
            onClick={() => {}}
          />
          <OptionItem
            icon={<MdOutlineLocationOn size={25} />}
            name="Spoty"
            onClick={() => {}}
          />
          <OptionItem
            icon={<MdEventNote size={25} />}
            name="Wydarzenia"
            onClick={() => {}}
          />
          <OptionItem
            icon={<AiOutlineQuestionCircle size={25} />}
            name="Problemy"
            onClick={() => {}}
          />
          <OptionItem
            icon={<BsBuildingUp size={25} />}
            name="Firmy"
            onClick={() => {}}
          />
        </div>

        <div className="flex flex-col items-start mb-2">
          <OptionItem
            icon={<FiSettings size={22} />}
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
  row?: boolean;
  icon: any;
  onClick: () => void;
}> = ({ icon, name, onClick, row = true }) => {
  return (
    <div
      className={`${row ? "flex-row gap-3" : "flex-col"} p-2 pr-1 pl-1 hover:opacity-70 cursor-pointer flex items-center justify-center gap-1`}
      onClick={onClick}
    >
      <div className="text-custom-secend">{icon}</div>
      <div className="text-[14px]">{name}</div>
    </div>
  );
};
