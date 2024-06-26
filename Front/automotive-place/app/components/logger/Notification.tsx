import { TLog } from "@/app/utils/types";
import { removeNotification } from "@/lib/features/notifications/notificationsSlice";
import { RootState } from "@/lib/store";
import moment from "moment";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

export type ICreateNotification = {
  log: TLog;
  leftIcon?: JSX.Element;
  timer: number;
};

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
    title: "Udało się dodać element",
    message: "Element został pomyślnie dodany do Twojego garażu",
  },
  timer: 2000,
};

export const Notification: FC = () => {
  const notifications = useSelector((state: RootState) => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notifications.length === 0) return;

    const timerId = setTimeout(() => {
      dispatch(removeNotification(notifications[0].id));
    }, notifications[0].timer);

    return () => {
      clearTimeout(timerId);
    };
  }, [notifications, dispatch]);

  return (
    <div className="fixed top-0 z-30 p-4 flex flex-col gap-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 20 }}
            transition={{ duration: 0.5 }}
            className="border-2 border-zinc-200 dark:border-zinc-900 bg-custom-primary text-custom-primary p-2 rounded-sm shadow-lg"
          >
            <div className="w-1 h-full bg-teal-500"></div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 justify-between w-full">
                <h3 className="text-sm">{notification.log.title}</h3>
                <div className="text-[9px] font-thin text-custom-secend">
                  {moment(notification.log.date).calendar()}
                </div>
              </div>
              {notification.log.message && (
                <p className="text-[11px] font-light">
                  {notification.log.message}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
