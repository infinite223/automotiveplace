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
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Yant } from "@/app/utils/helpers";
import { RootState } from "@/lib/store";
import {
  setShowCreatePost,
  setShowCreateProject,
} from "@/lib/features/actions/actionsSlice";
import Logo from "../../../asets/logo_2.png";
import Image from "next/image";
import { CreatePostView } from "../createPost";
import { CreateProjectView } from "../createProject";
import { IoNotifications } from "react-icons/io5";

interface ISideBar {}

export const SideBar: FC<ISideBar> = ({}) => {
  const dispatch = useDispatch();
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showCreateProject = useSelector(
    (state: RootState) => state.actions.showCreateProject
  );
  const showCreatePost = useSelector(
    (state: RootState) => state.actions.showCreatePost
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <SideBarDesktop openModal={openModal} pathname={pathname} />
      </div>

      {/* Mobile Sidebar */}
      <div className="block lg:hidden">
        <SideBarMobile openModal={openModal} pathname={pathname} />
      </div>

      <AMPModal
        onClose={closeModal}
        withHeader={true}
        visible={isModalOpen}
        title="Wybierz opcje"
        additionalTailwindCss="relative bottom-[15ch] bg-amp-100"
        defoultBG={false}
      >
        <SelectCreateOption />
      </AMPModal>

      <AMPModal
        onClose={() => dispatch(setShowCreateProject(false))}
        withHeader={true}
        visible={showCreateProject}
        title="Dodawanie projektu"
        additionalTailwindCss="relative bg-amp-100"
        defoultBG={false}
        bgOnClickClose={false}
      >
        <CreateProjectView />
      </AMPModal>

      <AMPModal
        onClose={() => dispatch(setShowCreatePost(false))}
        withHeader={true}
        visible={showCreatePost}
        title="Dodawanie postu"
        additionalTailwindCss="relative bg-amp-100"
        defoultBG={false}
        bgOnClickClose={false}
      >
        <CreatePostView />
      </AMPModal>
    </>
  );
};

const SideBarDesktop: FC<{ openModal: () => void; pathname: string }> = ({
  openModal,
  pathname,
}) => {
  const dispatch = useDispatch();
  const t = useTranslations();
  const router = useRouter();

  const smallScreenHiddenItem = "max-2xl:hidden";

  return (
    <div className="flex min-w-[85px] bg-amp-0 2xl:w-[240px] lg:h-full scroll-smoot custom-scrollbar overflow-y-auto flex-col justify-between">
      <div className="flex flex-col gap-1 h-[100%] 2xl:ml-4 justify-between py-2 pb-2">
        <div className="flex lg:flex-col justify-evenly lg:justify-center items-start max-2xl:items-center max-2xl:pr-0 max-2xl:min-w-0">
          <div className="flex items-center gap-2 mb-2 max-lg:hidden">
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
            onClick={() => router.push("/home")}
            isActive={pathname.includes("/home")}
          />
          <OptionItem
            icon={<LuSearch size={iconSizes.base} />}
            name={t("Core.Search")}
            additionalTailwindCss={smallScreenHiddenItem}
            onClick={() => dispatch(setIsSearchBarOpen(true))}
            isActive={pathname === "/search"}
          />

          <OptionItem
            icon={<RiPlayListAddLine size={iconSizes.base} />}
            name={t("Core.Add")}
            onClick={openModal}
            isActive={pathname === "/add"}
          />
          <OptionItem
            icon={<BiSolidCarGarage size={iconSizes.base} />}
            name={t("Core.Garage")}
            onClick={() => router.push("/garage")}
            isActive={pathname === "/garage"}
          />
          <AMPSeparator additionalTailwindCss={smallScreenHiddenItem} />

          <OptionItem
            icon={<MdGroups size={iconSizes.base} />}
            name={t("Core.Groups")}
            additionalTailwindCss={smallScreenHiddenItem}
            onClick={() => {}}
            isActive={pathname === "/groups"}
          />
          <OptionItem
            icon={<MdOutlineLocationOn size={iconSizes.base} />}
            name={t("Core.Spots")}
            additionalTailwindCss={smallScreenHiddenItem}
            onClick={() => {}}
            isActive={pathname === "/spots"}
          />
          <OptionItem
            icon={<MdEventNote size={iconSizes.base} />}
            name={t("Core.Events")}
            additionalTailwindCss={smallScreenHiddenItem}
            onClick={() => {}}
            isActive={pathname === "/events"}
          />
          <OptionItem
            icon={<MdLiveHelp size={iconSizes.base} />}
            name={t("Core.Problems")}
            additionalTailwindCss={smallScreenHiddenItem}
            onClick={() => {}}
            isActive={pathname === "/problems"}
          />
          <OptionItem
            icon={<RiBuildingFill size={iconSizes.base} />}
            name={t("Core.Company")}
            additionalTailwindCss={smallScreenHiddenItem}
            onClick={() => {}}
            isActive={pathname === "/company"}
          />
        </div>
        <div className="hidden lg:flex flex-col pr-3 max-2xl:pr-0 items-start max-2xl:items-center">
          <OptionItem
            icon={<FiSettings size={iconSizes.base} />}
            name={t("Core.Settings")}
            onClick={() => {}}
            isActive={pathname === "/settings"}
          />
        </div>
      </div>
    </div>
  );
};

const SideBarMobile: FC<{ openModal: () => void; pathname: string }> = ({
  openModal,
  pathname,
}) => {
  const t = useTranslations();
  const router = useRouter();

  return (
    <div className="flex bg-amp-50 w-full h-full p-2 px-3 flex-col">
      <div className="gap-4 pb-2 p-1 ml-0 items-center flex">
        {/* <Image src={Logo} alt="logo" width={17} height={17} /> */}
        <span className={`text-xs uppercase` + Yant.className}>
          Automotiveplace
        </span>
      </div>
      {/* <AMPSeparator /> */}

      <div className="flex w-full justify-between">
        <OptionItem
          icon={<Image src={Logo} alt="logo" width={21} height={21} />}
          name={t("Core.Home")}
          onClick={() => router.push("/home")}
          isActive={pathname === "/home"}
          showName={false}
        />
        <OptionItem
          icon={<LuSearch size={iconSizes.base} />}
          name={t("Core.Search")}
          onClick={() => {}}
          isActive={pathname === "/search"}
          showName={false}
        />
        <OptionItem
          icon={<RiPlayListAddLine size={iconSizes.base} />}
          name={t("Core.Add")}
          onClick={openModal}
          isActive={pathname === "/add"}
          showName={false}
        />
        <OptionItem
          icon={<BiSolidCarGarage size={iconSizes.base} />}
          name={t("Core.Garage")}
          onClick={() => router.push("/garage")}
          isActive={pathname === "/garage"}
          showName={false}
        />
        <OptionItem
          icon={<IoNotifications size={iconSizes.base} />}
          name={"Notifications"}
          onClick={() => {}}
          isActive={pathname === "/Notifications"}
          showName={false}
        />
        <OptionItem
          icon={<SlMenu size={iconSizes.base} />}
          name={t("Core.Menu")}
          onClick={() => {}}
          isActive={pathname === "/menu"}
          showName={false}
        />
      </div>
    </div>
  );
};

const OptionItem: FC<{
  name: string;
  icon: any;
  onClick: () => void;
  additionalTailwindCss?: string;
  isActive?: boolean;
  showName?: boolean;
}> = ({
  icon,
  name,
  onClick,
  additionalTailwindCss,
  isActive = false,
  showName = true,
}) => {
  return (
    <div
      className={`${additionalTailwindCss} flex-row ${
        isActive ? "opacity-90 font-bold" : "opacity-80"
      } gap-5 max-2xl:gap-2 max-2xl:flex-col p-2 pr-1 pl-1 hover:opacity-70 cursor-pointer flex items-center justify-center`}
      onClick={onClick}
    >
      {icon}
      {showName && (
        <div className="text-md max-2xl:text-[12px] text-center leading-4">
          {name}
        </div>
      )}
    </div>
  );
};
