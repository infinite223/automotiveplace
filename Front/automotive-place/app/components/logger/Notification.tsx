import { TLog } from "@/app/utils/types";
import { removeNotification } from "@/lib/features/notifications/notificationsSlice";
import { RootState } from "@/lib/store";
import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export type INotification = {
  id: number;
  log: TLog;
  leftIcon?: JSX.Element;
  timer: number;
};

const notificationTestData: INotification = {
  id: 1,
  log: {
    date: new Date(),
    status: "Success",
    title: "Udało sie dodać element",
    message: "Element został pomyślnie dodany do Twojego garażu",
  },
  timer: 2000,
};

export const Notification = () => {
  const notifications = useSelector((state: RootState) => state.notifications);
  const [currentNotification, setCurrentNotification] =
    useState<null | INotification>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notifications.length === 0) {
      setCurrentNotification(null);
      return;
    }

    setCurrentNotification(notifications[0]);

    const timerId = setTimeout(() => {
      if (currentNotification) {
        dispatch(removeNotification(currentNotification.id));
      }
    }, currentNotification?.timer);

    return () => {
      clearTimeout(timerId);
    };
  }, [notifications, dispatch, currentNotification]);

  return (
    <main
      className={`${currentNotification ? "flex" : "hidden"} border-2 border-zinc-200 dark:border-zinc-900 flex items-center gap-2 bg-custom-primary text-custom-primary p-2 fixed z-10 rounded-sm`}
    >
      <div className="w-1 h-full bg-teal-500 flex items-stretch"></div>
      {/* <div className="">{leftIcon}</div> */}
      <div className="flex flex-col gap-2 ">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-sm ">{currentNotification?.log.title}</h3>
          <div className="text-[9px] font-thin text-custom-secend">
            {moment(currentNotification?.log.date, "YYYYMMDD").calendar()}
          </div>
        </div>
        {currentNotification?.log.message && (
          <p className="text-[11px] font-light">
            {currentNotification?.log.message}
          </p>
        )}
      </div>
    </main>
  );
};
