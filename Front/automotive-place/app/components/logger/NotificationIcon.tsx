import { iconSizes } from "@/app/utils/constants";
import { INotification } from "@/app/utils/types";
import React from "react";
import { BiCheck } from "react-icons/bi";
import { ImInfo } from "react-icons/im";
import { IoAlert } from "react-icons/io5";

export const NotificationIcon = (notification: INotification) => {
  if (notification.showIcon && notification.leftIcon) {
    return notification.leftIcon;
  } else if (notification.showIcon) {
    if (notification.log.status == "Information") {
      return <ImInfo size={iconSizes.small} />;
    } else if (notification.log.status == "Success") {
      return <BiCheck size={iconSizes.small} />;
    } else {
      // TODO - dopisać reszte opcji jakie mogą być z enum ErrorStatus itp
      return <IoAlert size={iconSizes.small} color="#a52343" />;
    }
  }

  return;
};
