"use client";

import React, { FC, useEffect, useState } from "react";
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
import { useScrollDirection } from "@/app/hooks/useScrollDirection";
import Link from "next/link";

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
  const smallScreenHiddenItem = "max-2xl:hidden";
  const marginY = " my-2";

  return (
    <div className="flex min-w-[85px] bg-amp-0 2xl:w-[240px] lg:h-full flex-col justify-between overflow-hidden">
      <div className="flex flex-col gap-1 h-[100%] 2xl:ml-4 justify-between py-2 pb-2 overflow-hidden">
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

          <AMPSeparator
            additionalTailwindCss={smallScreenHiddenItem + marginY}
          />

          <OptionItem
            icon={<MdHome size={iconSizes.base} />}
            name={t("Core.Home")}
            onClick={() => {}}
            route="./"
            isActive={
              pathname.includes("/app") && pathname.split("/").length === 3
            }
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
            onClick={() => {}}
            isActive={pathname.includes("/app/garage")}
            route="./app//garage"
          />
          <AMPSeparator
            additionalTailwindCss={smallScreenHiddenItem + marginY}
          />

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

const SideBarMobile = ({ openModal, pathname }: any) => {
  const t = useTranslations();
  const scrollDirection = useScrollDirection();

  const isHidden = scrollDirection === "down";

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-50 bg-amp-50 h-16 flex items-center justify-around
        transition-transform duration-300
        ${isHidden ? "translate-y-full" : "translate-y-0"}
        lg:hidden
        shadow-md
      `}
    >
      <OptionItem
        icon={<Image src={Logo} alt="logo" width={21} height={21} />}
        name={t("Core.Home")}
        onClick={() => {}}
        isActive={pathname.includes("/app") && pathname.split("/").length === 3}
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
        onClick={() => {}}
        isActive={pathname.includes("/app/garage")}
        route="./app/garage"
        showName={false}
      />
      <OptionItem
        icon={<IoNotifications size={iconSizes.base} />}
        name="Notifications"
        onClick={() => {}}
        isActive={pathname === "/notifications"}
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
  );
};

const OptionItem: FC<{
  name: string;
  icon: any;
  onClick?: () => void;
  additionalTailwindCss?: string;
  isActive?: boolean;
  showName?: boolean;
  route?: string | null;
}> = ({
  icon,
  name,
  onClick,
  additionalTailwindCss,
  isActive = false,
  showName = true,
  route = null,
}) => {
  const classes = `${additionalTailwindCss || ""} flex-row ${
    isActive ? "font-bold" : "opacity-80"
  } gap-5 max-2xl:gap-2 max-2xl:flex-col p-2 pr-1 hover:bg-amp-200 rounded-md pl-1 2xl:pl-3 w-full cursor-pointer flex items-center justify-start`;

  if (route) {
    return (
      <Link
        href={route}
        className={classes}
        onClick={(e) => {
          onClick?.();
          e.currentTarget.blur();
        }}
      >
        {icon}
        {showName && (
          <div className="text-md max-2xl:text-[12px] text-center leading-4">
            {name}
          </div>
        )}
      </Link>
    );
  }

  return (
    <div className={classes} onClick={onClick}>
      {icon}
      {showName && (
        <div className="text-md max-2xl:text-[12px] text-center leading-4">
          {name}
        </div>
      )}
    </div>
  );
};
