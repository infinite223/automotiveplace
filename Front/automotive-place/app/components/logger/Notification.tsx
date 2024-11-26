"use client";

import { removeNotification } from "@/lib/features/notifications/notificationsSlice";
import { RootState } from "@/lib/store";
import moment from "moment";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { NotificationIcon } from "./NotificationIcon";
import { useTranslations } from "next-intl";

export const Notification: FC = () => {
  const notifications = useSelector((state: RootState) => state.notifications);
  const dispatch = useDispatch();
  const t = useTranslations();

  useEffect(() => {
    if (notifications.length === 0) return;
    const timers = notifications.map((notification) => {
      const timerId = setTimeout(() => {
        dispatch(removeNotification(notification.id));
      }, notification.timer);

      return timerId;
    });

    return () => {
      timers.forEach((timerId) => clearTimeout(timerId));
    };
  }, [notifications, dispatch]);

  return (
    <div className="fixed top-0 z-30 p-4 flex flex-col gap-2 right-0">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 20 }}
            transition={{ duration: 0.5 }}
            className="border-2 border-zinc-200 dark:border-zinc-900 bg-amp-900 dark:bg-amp-0bg-amp-000 dark:bg-amp-900 p-2 rounded-sm shadow-lg"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 justify-between w-full">
                <NotificationIcon {...notification} />
                <h3 className="text-sm">{t(notification.log.title)}</h3>
                <div className="text-[11px] font-thin bg-amp-800 dark:bg-amp-100">
                  {moment(notification.log.date).calendar()}
                </div>
              </div>
              {notification.log.message && (
                <p className="text-[11px] font-light">
                  {t(notification.log.message)}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
