import React, { FC, useState } from "react";
import { FaCarRear } from "react-icons/fa6";
import { FaCalendarDay, FaLocationArrow } from "react-icons/fa";
import { PiQuestionMarkFill } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import { BsPostcardFill } from "react-icons/bs";
import { iconSizes } from "@/app/utils/constants";
import { AMPSeparator } from "../shared/AMPSeparator";
import { useDispatch } from "react-redux";
import {
  setShowCreatePost,
  setShowCreateProject,
} from "@/lib/features/actions/actionsSlice";
const iconSize = iconSizes.small;

export const SelectCreateOption: FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col min-w-20 min-h-10 sm:w-[500px] w-[95vw]">
      <OptionItem
        name="Dodaj projekt"
        onClick={() => dispatch(setShowCreateProject(true))}
        icon={<FaCarRear size={iconSize} />}
      />
      <OptionItem
        name="Dodaj post"
        onClick={() => dispatch(setShowCreatePost(true))}
        icon={<BsPostcardFill size={iconSize} />}
      />
      <OptionItem
        name="Dodaj problem"
        onClick={() => {}}
        icon={<PiQuestionMarkFill size={iconSize} />}
      />
      <OptionItem
        name="Dodaj spot"
        onClick={() => {}}
        icon={<FaLocationArrow size={iconSize} />}
      />
      <OptionItem
        name="Dodaj wydarzenie"
        onClick={() => {}}
        icon={<FaCalendarDay size={iconSize} />}
      />

      <AMPSeparator />

      <footer className="text-sm opacity-75 p-2 px-4 leading-4">
        Po najechaniu na wybraną opcje możesz zobaczyć dodatkowe informacje.
      </footer>
    </div>
  );
};

const OptionItem = ({
  name,
  onClick,
  icon,
}: {
  name: string;
  onClick: () => void;
  icon?: any;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onClick={onClick}
      className="w-full rounded-sm flex flex-co gap-4 px-4 text-white/80 items-center p-2 cursor-pointer hover:bg-amp-700 dark:hover:bg-amp-300/50"
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          key="icon"
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [30, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1, delay: 0 }}
          key="text"
          className="flex justify-center"
        >
          <h3 className="text-[13px] text-center font-semibold">{name}</h3>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
