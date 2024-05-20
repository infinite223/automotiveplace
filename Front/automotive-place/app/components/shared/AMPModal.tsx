import {ReactNode} from "react";
import {MdOutlineCloseFullscreen} from "react-icons/md";

interface IModalProps {
  onClose: () => void;
  children: ReactNode;
  withHeader: boolean;
  title?: string;
}

const AMPModal = ({onClose, children, withHeader, title}: IModalProps) => {
  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 w-full z-20 h-full flex justify-center items-center bg-teal-950/25 bg-opacity-50 custom-blur"
    >
      <div className="bg-custom-primary shadow-zinc-200 dark:shadow-zinc-800 shadow-sm rounded-md p-0 z-30">
        {withHeader && <AMPModalHeader title={title} onClose={onClose} />}
        {children}
      </div>
    </div>
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
