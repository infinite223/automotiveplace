import React, { FC, useState } from "react";
import { FaCarRear } from "react-icons/fa6";
import { FaCalendarDay, FaLocationArrow } from "react-icons/fa";
import { PiQuestionMarkFill } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import { BsPostcardFill } from "react-icons/bs";
import { iconSizes } from "@/app/utils/constants";

export const SelectCreateOption: FC = () => {
  return (
    <div className="flex flex-col min-w-20 min-h-10 w-[400px]">
      <OptionItem
        name="Dodaj projekt"
        onClick={() => {}}
        icon={<FaCarRear size={iconSizes.small} />}
      />
      <OptionItem
        name="Dodaj post"
        onClick={() => {}}
        icon={<BsPostcardFill size={iconSizes.small} />}
      />
      <OptionItem
        name="Dodaj problem"
        onClick={() => {}}
        icon={<PiQuestionMarkFill size={iconSizes.small} />}
      />
      <OptionItem
        name="Dodaj spot"
        onClick={() => {}}
        icon={<FaLocationArrow size={iconSizes.small} />}
      />
      <OptionItem
        name="Dodaj wydarzenie"
        onClick={() => {}}
        icon={<FaCalendarDay size={iconSizes.small} />}
      />
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
      whileHover={{ backgroundColor: "rgb(82, 82, 91)" }}
      className="w-full rounded-sm flex flex-co gap-4 px-4 items-center p-2 cursor-pointer"
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
          <h3 className="uppercase text-[13px] text-center  font-semibold">
            {name}
          </h3>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
