"use client";

import React, { FC, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { BiSolidCarGarage } from "react-icons/bi";
import { RiPlayListAddLine } from "react-icons/ri";
import { MdGroups, MdLiveHelp } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { MdHome } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setIsSearchBarOpen } from "@/lib/features/searchBar/searchBarSlice";
import { AMPSeparator } from "./AMPSeparator";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdEventNote } from "react-icons/md";
import { RiBuildingFill } from "react-icons/ri";
import AMPModal from "./AMPModal";
import { SelectCreateOption } from "../selectCreateOption";
import { iconSizes } from "@/app/utils/constants";
import { SlMenu } from "react-icons/sl";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface ISideBar {}

export const SideBar: FC<ISideBar> = ({}) => {
  // TODO - change to global variable
  const dispatch = useDispatch();
  const t = useTranslations();
  const router = useRouter();
  const smallScreenHiddenItem = "max-2xl:hidden";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // TODO - zmiana wyświetlania się sidebara dla mobilnej wersji lub implementacja nowego
  return (
    <div className="flex min-w-[100px] 2xl:w-[240px] border-zinc-900 h-full border-r-1 scroll-smoot custom-scrollbar overflow-y-auto flex-col justify-between">
      <div className="flex flex-col gap-1 h-[100%] pl-2 justify-between py-1 pb-2">
        <div className="flex flex-col items-start max-2xl:items-center max-2xl:pr-3 max-2xl:min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="px-4 ml-1 2xl:hidden mt-4">
              <SlMenu size={iconSizes.base} />
            </div>
            <div className="flex flex-col pl-1  max-2xl:hidden">
              <h2 className="m-0 p-0 text-2xl font-extrabold tracking-[2px]">
                <span className="text-baseColor">A</span>MP
              </h2>
              <p className="text-sm p-0 m-0 mt-[-5px]">
                <span>Auto</span>
                <span className="text-baseColor uppercase font-bold">
                  motiveplace
                </span>
              </p>
            </div>
          </div>
          <OptionItem
            icon={<MdHome size={iconSizes.base} />}
            name={t("Core.Home")}
            onClick={() => router.push("home")}
          />
          <OptionItem
            icon={<LuSearch size={iconSizes.base} />}
            name={t("Core.Search")}
            additionalTailwindCss={smallScreenHiddenItem}
            onClick={() => dispatch(setIsSearchBarOpen(true))}
          />
          <AMPSeparator additionalTailwindCss={smallScreenHiddenItem} />

          <OptionItem
            icon={<RiPlayListAddLine size={iconSizes.base} />}
            name={t("Core.Add")}
            onClick={() => openModal()}
          />
          <OptionItem
            icon={<BiSolidCarGarage size={iconSizes.base} />}
            name={t("Core.Garage")}
            onClick={() => router.push("garage")}
          />
          <AMPSeparator additionalTailwindCss={smallScreenHiddenItem} />

          <OptionItem
            icon={<MdGroups size={iconSizes.base} />}
            name={t("Core.Groups")}
            additionalTailwindCss={smallScreenHiddenItem}
            onClick={() => {}}
          />
          <OptionItem
            icon={<MdOutlineLocationOn size={iconSizes.base} />}
            name={t("Core.Spots")}
            additionalTailwindCss={smallScreenHiddenItem}
            onClick={() => {}}
          />
          <OptionItem
            icon={<MdEventNote size={iconSizes.base} />}
            name={t("Core.Events")}
            additionalTailwindCss={smallScreenHiddenItem}
            onClick={() => {}}
          />
          <OptionItem
            icon={<MdLiveHelp size={iconSizes.base} />}
            name={t("Core.Problems")}
            additionalTailwindCss={smallScreenHiddenItem}
            onClick={() => {}}
          />
          <OptionItem
            icon={<RiBuildingFill size={iconSizes.base} />}
            name={t("Core.Company")}
            additionalTailwindCss={smallScreenHiddenItem}
            onClick={() => {}}
          />
        </div>

        <div className="flex flex-col items-start max-2xl:items-center max-2xl:pr-3 max-2xl:min-w-0 min-w-[170px]">
          <OptionItem
            icon={<FiSettings size={iconSizes.base} />}
            name={t("Core.Settings")}
            onClick={() => {}}
          />
        </div>
      </div>

      {/* TODO -  czy na pewno chce w ten sposób dodawać rzeczy?*/}
      <AMPModal
        onClose={closeModal}
        withHeader={false}
        visible={isModalOpen}
        title="Dodawanie"
        additionalTailwindCss="relative bottom-40"
        defoultBG={false}
      >
        <SelectCreateOption />
      </AMPModal>
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
      <div className="text-custom-secendary">{icon}</div>
      <div className="text-md max-2xl:text-[12px] text-center leading-4">
        {name}
      </div>
    </div>
  );
};
