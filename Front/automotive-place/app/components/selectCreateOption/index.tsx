import React, { FC, useState } from "react";
import { SiElement } from "react-icons/si";
import { FaCarRear } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa";
import { PiQuestionMarkFill } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";

interface ISelectCreateOption {
  //   postData: TPost;
}

const iconSize = 22;

export const SelectCreateOption: FC = () => {
  return (
    <div className="flex items-center gap-1 min-w-20 min-h-10 mb-[75%]">
      <OptionItem
        name="Dodaj projekt"
        onClick={() => {}}
        icon={<FaCarRear size={iconSize} />}
      />
      <OptionItem
        name="Dodaj spot"
        onClick={() => {}}
        icon={<FaLocationArrow size={iconSize} />}
      />
      <OptionItem
        name="Dodaj podzespół"
        onClick={() => {}}
        icon={<SiElement size={iconSize} />}
      />
      <OptionItem
        name="Dodaj problem"
        onClick={() => {}}
        icon={<PiQuestionMarkFill size={iconSize} />}
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ backgroundColor: "rgb(13 148 136)", height: "150px" }}
      className="w-[140px] rounded-sm flex flex-col bg-zinc-200 dark:bg-zinc-900 gap-5 items-center justify-center p-10 cursor-pointer"
    >
      <AnimatePresence>
        {/* {!isHovered && ( */}
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          key="icon"
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
        {/* )} */}
      </AnimatePresence>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [30, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            key="text"
            className="flex items-center justify-center"
          >
            <h3 className="uppercase text-[13px] text-center max-w-[100px] font-bold">
              {name}
            </h3>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
