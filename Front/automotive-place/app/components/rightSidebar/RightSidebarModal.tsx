import ChatSidebarContent from "./ChatSidebarContent";
import { AnimatePresence } from "framer-motion";
import UserSidebarContent from "./UserSidebarContent";
import NotificationsSidebarContent from "./NotificationsSidebarContent";

export type TContentType = "chat" | "user" | "notifications" | null;
interface IRightSidebarModal {
  contentType: TContentType;
}

export const RightSidebarModal = ({ contentType }: IRightSidebarModal) => {
  const tailwindContainer =
    "flex fixed right-4 p-4 rounded-md top-16 bg-amp-700 dark:bg-amp-50 w-[300px] h-[500px] z-20";

  if (!contentType) return null;

  return (
    <AnimatePresence>
      {contentType === "chat" && (
        <ChatSidebarContent tailwindContainer={tailwindContainer} />
      )}
      {contentType === "notifications" && (
        <NotificationsSidebarContent tailwindContainer={tailwindContainer} />
      )}
      {contentType === "user" && (
        <UserSidebarContent tailwindContainer={tailwindContainer} />
      )}
    </AnimatePresence>
  );
};
