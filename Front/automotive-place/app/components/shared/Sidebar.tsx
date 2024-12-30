"use client";

import React, { FC, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { BiSolidCarGarage } from "react-icons/bi";
import { RiPlayListAddLine } from "react-icons/ri";
import { MdGroups, MdLiveHelp } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { MdHome } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
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
import { KalamBold, Yant } from "@/app/utils/helpers";
import { CreateProblemView } from "../createProblem";
import { RootState } from "@/lib/store";
import { setShowCreateProject } from "@/lib/features/actions/actionsSlice";
import Logo from "../../../asets/logo_2.png";
import Image from "next/image";

interface ISideBar {}

export const SideBar: FC<ISideBar> = ({}) => {
  // TODO - change to global variable
  const dispatch = useDispatch();
  const t = useTranslations();
  const router = useRouter();
  const smallScreenHiddenItem = "max-2xl:hidden";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showCreateProject = useSelector(
    (state: RootState) => state.actions.showCreateProject
  );
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // TODO - zmiana wyświetlania się sidebara dla mobilnej wersji lub implementacja nowego
  return (
    <div className="flex min-w-[85px] bg-amp-0 2xl:w-[240px] h-full scroll-smoot custom-scrollbar overflow-y-auto flex-col justify-between">
      <div className="flex flex-col gap-1 h-[100%] 2xl:ml-4 justify-between py-1 pb-2">
        <div className="flex flex-col items-start max-2xl:items-center max-2xl:pr-0 max-2xl:min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="px-4 2xl:hidden mt-4">
              <SlMenu size={iconSizes.base} />
            </div>

            <div className="gap-4 pl-1 pt-2 items-center hidden 2xl:flex">
              <Image src={Logo} alt="logo" width={25} height={25} />
              <span className={`text-md uppercase` + Yant.className}>
                Automotiveplace
              </span>
            </div>
          </div>
          <AMPSeparator additionalTailwindCss={smallScreenHiddenItem} />

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
        <div className="flex flex-col pr-3 max-2xl:pr-0 items-start max-2xl:items-center">
          <OptionItem
            icon={<FiSettings size={iconSizes.base} />}
            name={t("Core.Settings")}
            onClick={() => {}}
          />
        </div>
      </div>

      <AMPModal
        onClose={closeModal}
        withHeader={true}
        visible={isModalOpen}
        title="Wybierz opcje"
        additionalTailwindCss="relative bottom-[15vh] bg-amp-900 dark:bg-amp-50 border-1 border-amp-700 dark:border-amp-300"
        defoultBG={false}
      >
        <SelectCreateOption />
      </AMPModal>

      <AMPModal
        onClose={() => dispatch(setShowCreateProject(false))}
        withHeader={true}
        visible={showCreateProject}
        title="Dodawanie projektu"
        additionalTailwindCss="relative bottom-40 bg-zinc-900"
        defoultBG={false}
      >
        <CreateProblemView />
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
      {icon}
      <div className="text-md max-2xl:text-[12px] text-center leading-4">
        {name}
      </div>
    </div>
  );
};
