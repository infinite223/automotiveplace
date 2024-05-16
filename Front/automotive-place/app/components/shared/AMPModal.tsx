import {ReactNode} from "react";

// components/Modal.js
interface IModalProps {
  onClose: () => void;
  children: ReactNode;
}

const AMPModal = ({onClose, children}: IModalProps) => {
  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 w-full z-20 h-full flex justify-center items-center bg-teal-950/25 bg-opacity-50 custom-blur"
    >
      <div className="bg-custom-primary shadow-zinc-200 dark:shadow-zinc-800 shadow-sm rounded-md p-0 z-30">
        {children}
      </div>
    </div>
  );
};

export default AMPModal;
