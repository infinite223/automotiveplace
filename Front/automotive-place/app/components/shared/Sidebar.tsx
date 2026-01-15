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
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { RootState } from "@/lib/store";
import {
  setShowCreatePost,
  setShowCreateProject,
} from "@/lib/features/actions/actionsSlice";
import Logo from "../../../asets/logo_2.png";
import Image from "next/image";
import { CreatePostView } from "../createPost";
import { CreateProjectView } from "../createProject";
import { useScrollDirection } from "@/app/hooks/useScrollDirection";
import Link from "next/link";
import { Yant } from "@/app/utils/helpers/fontsHelper";
import { scrollContainerToTop } from "@/app/utils/helpers/navigationHelper";
import z from "zod";
import { createZodErrorMap } from "@/app/api/zodErrorMap";
import { motion, AnimatePresence } from "framer-motion";
import UserSidebarContent from "../rightSidebar/UserSidebarContent";
import { AiOutlinePlus } from "react-icons/ai";

export const SideBar = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const t = useTranslations();
  z.setErrorMap(createZodErrorMap(t));

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
      <div className="hidden lg:block">
        <SideBarDesktop openModal={openModal} pathname={pathname} />
      </div>

      <div className="block lg:hidden">
        <SideBarMobile openModal={openModal} pathname={pathname} />
      </div>

      <AMPModal
        onClose={closeModal}
        withHeader={false}
        visible={isModalOpen}
        title="Wybierz opcje"
        additionalTailwindCss="bg-amp-700 dark:bg-amp-50 rounded-md"
        defoultBG={false}
      >
        <SelectCreateOption closeModal={closeModal} />
      </AMPModal>

      <AMPModal
        onClose={() => dispatch(setShowCreateProject(false))}
        withHeader={true}
        visible={showCreateProject}
        title="Dodawanie projektu"
        additionalTailwindCss="relative bg-amp-700 dark:bg-amp-50 rounded-md "
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
        additionalTailwindCss="relative bg-amp-700 dark:bg-amp-50 rounded-md"
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
  const locale = useLocale();

  return (
    <div className="flex min-w-[85px] bg-amp-0 2xl:w-[190px] lg:h-full flex-col justify-between ">
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

          <AMPSeparator
            additionalTailwindCss={smallScreenHiddenItem + marginY}
          />

          <OptionItem
            icon={<MdHome size={iconSizes.base} />}
            name={t("Core.Home")}
            onClick={() => {}}
            route={`/${locale}/app`}
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
  const locale = useLocale();
  const isHidden = scrollDirection === "down";

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* BOTTOM BAR */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 z-40 bg-amp-0 h-16 flex items-center justify-around
          transition-transform duration-300
          ${isHidden ? "translate-y-full" : "translate-y-0"}
          lg:hidden
          shadow-md
        `}
      >
        <OptionItem
          icon={<MdHome size={iconSizes.large} />}
          name={t("Core.Home")}
          route={`/${locale}/app`}
          isActive={
            pathname.includes("/app") && pathname.split("/").length === 3
          }
          showName={false}
        />

        <OptionItem
          icon={<LuSearch size={iconSizes.base} />}
          name={t("Core.Search")}
          showName={false}
        />

        <OptionItem
          icon={
            <AiOutlinePlus
              size={iconSizes.large}
              className="bg-amp-500 h-10 w-10 rounded-full p-2"
            />
          }
          name={t("Core.Add")}
          onClick={openModal}
          showName={false}
          isActive
        />

        <OptionItem
          icon={<BiSolidCarGarage size={iconSizes.base} />}
          name={t("Core.Garage")}
          route="./app/garage"
          showName={false}
        />

        {/* MENU BUTTON */}
        <OptionItem
          icon={<SlMenu size={iconSizes.base} />}
          name={t("Core.Menu")}
          onClick={() => setIsMenuOpen(true)}
          showName={false}
        />
      </div>

      {/* SLIDE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* DRAWER */}
            <motion.div
              className="fixed top-0 left-0 h-full w-[280px] bg-amp-50 z-50 p-4 pt-6"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* <MobileMenuContent onClose={() => setIsMenuOpen(false)} /> */}
              <UserSidebarContent tailwindContainer="" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export const OptionItem: FC<{
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
  const pathname = usePathname();

  const classes = `${additionalTailwindCss || ""} flex-row ${
    isActive ? "font-semibold opacity-90" : "opacity-80"
  } gap-5 max-2xl:gap-2 max-2xl:flex-col p-2 pr-1 md:hover:bg-amp-200 rounded-md pl-1 2xl:pl-3 w-full cursor-pointer flex items-center justify-start`;
  if (route) {
    const handleClick = (
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
      if (pathname === route) {
        e.preventDefault();
        scrollContainerToTop();
      }
      onClick?.();
      e.currentTarget.blur();
    };

    if (route) {
      return (
        <Link href={route} className={classes} onClick={handleClick}>
          {icon}
          {showName && (
            <div className="text-md max-2xl:text-[12px] text-center leading-4">
              {name}
            </div>
          )}
        </Link>
      );
    }
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
