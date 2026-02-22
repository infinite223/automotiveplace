"use client";

import { use, useEffect, useState } from "react";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { useQuery } from "@tanstack/react-query";
import { getGarage } from "@/app/services/garage";
import { TGarage } from "@/app/utils/types/garage";
import { ProjectsTab } from "./tabs/projectsTab";
import { CarItemsTab } from "./tabs/carItemsTab";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingSpinner } from "@/app/components/loading/LoadingSpinner";

export const QUERY_KEY_GARAGE = "garage";

const garageTabs = [
  { id: "projekty", label: "Projekty" },
  { id: "czesci", label: "Moje części" },
];

export default function Garage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [userId, setUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("projekty");

  const { data, isLoading, isError } = useQuery<TGarage>({
    queryKey: [QUERY_KEY_GARAGE, id], // Dodano id do klucza
    queryFn: () => getGarage(id),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    const getUser = async () => {
      setUserId((await getLoggedInUser())?.user.$id ?? null);
    };
    getUser();
  }, []);

  const isOwner = userId === id;

  if (isLoading && !data)
    return (
      <div className="fixed inset-0 z-[88] flex w-full min-h-screen bg-black justify-center items-center text-white text-lg">
        <LoadingSpinner />
      </div>
    );

  return (
    <main className="fixed inset-0 z-[88] flex w-full min-h-dvh custom-scrollbar overflow-y-auto bg-amp-900 dark:bg-amp-0 flex-col items-center text-black dark:text-white">
      <div className="max-w-screen-2xl w-full flex flex-col pb-32">
        <div className="px-4 pt-8 pb-4">
          <h1 className="font-bold text-3xl">Garaż</h1>
          <p className="opacity-60 text-sm">
            Zarządzaj swoją kolekcją i częściami
          </p>
        </div>

        <nav className="flex w-full items-center gap-3 border-b border-amp-700 dark:border-amp-200 overflow-x-auto no-scrollbar">
          {garageTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-3 transition-all ${
                activeTab === tab.id
                  ? "font-bold text-white"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="underline-garage"
                  className="absolute left-0 bottom-0 w-full h-[2px] bg-amp-500"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === "projekty" && (
              <motion.div
                key="projekty-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ProjectsTab
                  isUserContent={isOwner}
                  projects={data?.projects ?? []}
                />
              </motion.div>
            )}

            {activeTab === "czesci" && (
              <motion.div
                key="czesci-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <CarItemsTab
                  isUserContent={isOwner}
                  carItems={data?.carItems ?? []}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
