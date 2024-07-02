import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import useKeyboardShortcut from "@/app/hooks/useKeydown";

const shortcutConfig = {
  code: "esc",
};

interface IModalProps {
  onClose: () => void;
  children: ReactNode;
  withHeader: boolean;
  title?: string;
  visible: boolean;
  additionalTailwindCss?: string;
  defoultBG?: boolean;
}

const AMPModal = ({
  onClose,
  children,
  withHeader,
  title,
  additionalTailwindCss,
  visible,
  defoultBG = true,
}: IModalProps) => {
  useKeyboardShortcut(onClose, shortcutConfig);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          onClick={onClose}
          className="fixed cursor-pointer top-0 left-0 w-full z-20 h-full flex justify-center items-center bg-zinc-100/25 dark:bg-zinc-950/25 bg-opacity-50 custom-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={1}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={`${additionalTailwindCss} cursor-default`}
            id="onClose_helper"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`${defoultBG && "bg-custom-primary"} shadow-zinc-200 dark:shadow-zinc-800 rounded-md p-0 z-30`}
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
      <MdOutlineCloseFullscreen
        onClick={onClose}
        className="hover:text-red-500 hover:scale-90 cursor-pointer"
      />
    </div>
  );
};
