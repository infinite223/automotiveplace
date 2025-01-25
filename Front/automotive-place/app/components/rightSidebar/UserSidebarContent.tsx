import React from "react";
import { motion } from "framer-motion";

export default function UserSidebarContent({
  tailwindContainer,
}: {
  tailwindContainer: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0, transition: { duration: 0 } }}
      key={1}
      className={tailwindContainer}
    >
      <div className="flex flex-col w-full h-full">
        <nav className="flex w-full items-center justify-between gap-2">
          <h1>User</h1>
        </nav>
      </div>
    </motion.div>
  );
}
