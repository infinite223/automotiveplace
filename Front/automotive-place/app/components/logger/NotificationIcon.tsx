import { iconSizes } from "@/app/utils/constants";
import { ErrorStatus } from "@/app/utils/enums";
import { INotification } from "@/app/utils/types";
import { BiCheck } from "react-icons/bi";
import { ImInfo } from "react-icons/im";
import { IoAlert } from "react-icons/io5";
import { MdErrorOutline, MdError } from "react-icons/md";

export const NotificationIcon = (notification: INotification) => {
  if (notification.showIcon && notification.leftIcon) {
    return notification.leftIcon;
  } else if (notification.showIcon) {
    if (notification.log.status == "Information") {
      return <ImInfo size={iconSizes.small} />;
    } else if (notification.log.status == "Success") {
      return <BiCheck size={iconSizes.small} />;
    } else if (notification.log.status == ErrorStatus.Low) {
      return <MdErrorOutline size={iconSizes.small} />;
    } else if (notification.log.status == ErrorStatus.Medium) {
      return <MdErrorOutline size={iconSizes.small} color="#982343" />;
    } else if (notification.log.status == ErrorStatus.High) {
      return <MdErrorOutline size={iconSizes.small} color="#982343" />;
    } else if (notification.log.status == ErrorStatus.Critical) {
      return <MdError size={iconSizes.small} color="#982343" />;
    } else {
      return <IoAlert size={iconSizes.small} color="#a52343" />;
    }
  }

  return;
};
