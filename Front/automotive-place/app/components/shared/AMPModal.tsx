import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import useKeyboardShortcut from "@/app/hooks/useKeydown";
import { iconSizes, shortcutConfigs } from "@/app/utils/constants";

interface IModalProps {
  onClose: () => void;
  children: ReactNode;
  withHeader: boolean;
  title?: string;
  visible: boolean;
  additionalTailwindCss?: string;
  defoultBG?: boolean;
  bgOnClickClose?: boolean;
}

const AMPModal = ({
  onClose,
  children,
  withHeader,
  title,
  additionalTailwindCss,
  visible,
  defoultBG = true,
  bgOnClickClose = true,
}: IModalProps) => {
  useKeyboardShortcut(onClose, shortcutConfigs.escape);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          onClick={bgOnClickClose ? onClose : () => {}}
          className="fixed cursor-pointer top-0 left-0 w-full z-20 h-screen flex justify-center items-center  custom-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={1}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={`${additionalTailwindCss} cursor-default max-md:max-h-screen`}
            id="onClose_helper"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`${defoultBG && "bg-custom-primary"} shadow-amp-800 dark:shadow-amp-200 rounded-sm p-0 z-30`}
            >
              {withHeader && <AMPModalHeader title={title} onClose={onClose} />}
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AMPModal;

const AMPModalHeader = ({
  title,
  onClose,
}: {
  title?: string;
  onClose: () => void;
}) => {
  return (
    <div className="w-full flex items-center justify-between p-5">
      <h3 className="font-bold">{title}</h3>
      <MdClose
        onClick={onClose}
        size={iconSizes.base}
        className="hover:opacity-70 cursor-pointer"
      />
    </div>
  );
};
