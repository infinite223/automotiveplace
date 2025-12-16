import React, { FC } from "react";
import { motion } from "framer-motion";
import {
  EventIcon,
  iconSizes,
  PostIcon,
  ProblemIcon,
  ProjectIcon,
  SpotIcon,
} from "@/app/utils/constants";
import { useDispatch } from "react-redux";
import {
  setShowCreatePost,
  setShowCreateProject,
} from "@/lib/features/actions/actionsSlice";
const iconSize = iconSizes.small;

export const SelectCreateOption: FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col w-full py-4 sm:w-[400px]">
      <OptionItem
        name="Dodaj projekt"
        onClick={() => {
          closeModal();
          dispatch(setShowCreateProject(true));
        }}
        icon={<ProjectIcon size={iconSize} />}
      />

      <OptionItem
        name="Opublikuj post"
        onClick={() => {
          closeModal();
          dispatch(setShowCreatePost(true));
        }}
        icon={<PostIcon size={iconSize} />}
      />

      <OptionItem
        name="Utórz szybki spot"
        onClick={() => {}}
        icon={<SpotIcon size={iconSize} />}
      />

      <OptionItem
        name="Utwórz wydarzenie"
        onClick={() => {}}
        icon={<EventIcon size={iconSize} />}
      />

      <OptionItem
        name="Dodaj problem"
        onClick={() => {}}
        icon={<ProblemIcon size={iconSize} />}
      />
    </div>
  );
};

const OptionItem = ({
  name,
  onClick,
  icon,
  danger = false,
}: {
  name: string;
  onClick: () => void;
  icon?: any;
  danger?: boolean;
}) => {
  return (
    <motion.div
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={`
        w-full flex items-center gap-4 px-4 py-2.5 cursor-pointer
        ${danger ? "text-red-500" : "text-white/90"}
        hover:bg-white/5
      `}
    >
      <div
        className={`
          w-10 h-10 flex items-center justify-center rounded-xl
          ${danger ? "bg-red-500/20" : "bg-amp-300"}
        `}
      >
        {icon}
      </div>

      <h3 className="text-[15px] font-medium">{name}</h3>
    </motion.div>
  );
};
