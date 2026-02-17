import { Status } from "@/app/utils/enums";
import { ICreateNotification } from "@/app/utils/types";

const CreateNotification = (
  status: Status,
  title: string,
  message?: string
) => {
  const newNotifiaction: ICreateNotification = {
    log: {
      date: new Date(),
      status,
      title,
      message,
    },
    timer: 3000,
  };

  return newNotifiaction;
};

const CreateNotificationWithIcon = (
  status: Status,
  title: string,
  leftIcon: JSX.Element,
  message?: string
) => {
  let newNotifiaction = CreateNotification(status, title, message);

  newNotifiaction.showIcon = true;
  newNotifiaction.leftIcon = leftIcon;

  return newNotifiaction;
};

export { CreateNotification, CreateNotificationWithIcon };
