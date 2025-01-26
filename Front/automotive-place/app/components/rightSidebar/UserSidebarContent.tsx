"use server";

import React from "react";
import { motion } from "framer-motion";
import { useLoggedInUser } from "@/app/hooks/useLoggedInUser";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/actions/user.actions";

export default async function UserSidebarContent({
  tailwindContainer,
}: {
  tailwindContainer: string;
}) {
  // const { user, loading, error } = useLoggedInUser();
  // const router = useRouter();

  // if (error) {
  //   router.push("/");
  // }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0, transition: { duration: 0 } }}
      key={1}
      className={tailwindContainer}
    >
      <div className="flex flex-col w-full">
        <nav className="flex w-full font-bold items-center justify-between gap-2">
          {/* <h1>{user?.name}</h1> */}
        </nav>

        <div className="flex gap-2 w-full">
          <div className="flex gap-2 w-full" onClick={signOut}>
            Wyloguj się
          </div>
        </div>
      </div>
    </motion.div>
  );
}
