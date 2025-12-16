"use client";

import React, { useEffect, useRef, useState } from "react";
import { TContentData } from "@/app/utils/types";
import { isTBasicProject } from "@/app/utils/types/project";
import { ProjectMiniView } from "./ProjectMiniView";
import { isTBasicPost } from "@/app/utils/types/post";
import { PostMiniView } from "./PostMiniView";
import { ProblemMiniView } from "./ProblemMiniView";
import { isTProblem } from "@/app/utils/types/problem";
import { isTSpot } from "@/app/utils/types/spot";
import { SpotMiniView } from "./SpotMiniView";
import { CarItemMiniView } from "./CarItemMiniView";
import { isTCarItem } from "@/app/utils/types/carItem";
import { LoadingMiniView } from "./LoadingMiniView";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import useOnScreen from "@/app/hooks/useOnScreen";
import { ContentType } from "@/app/utils/enums";
import { useTranslations } from "next-intl";
import {
  MainContentResponse,
  QUERY_KEY_MAIN_CONTENT,
  useMainContent,
} from "@/app/hooks/useMainContent";
import { ContentTypeFilter } from "./ContentTypeFilter";
import { iconSizes } from "@/app/utils/constants";
import Logo from "../../../../asets/logo_2.png";
import { Yant } from "@/app/utils/helpers/fontsHelper";
import Image from "next/image";
import { IoNotifications } from "react-icons/io5";
import { useQueryClient } from "@tanstack/react-query";

const headerMap: Record<ContentType, string> = {
  [ContentType.Project]: "Najnowsze projekty",
  [ContentType.Post]: "Najnowsze posty",
  [ContentType.Problem]: "Najnowsze problemy",
  [ContentType.Spot]: "Najnowsze spoty",
  [ContentType.Event]: "Najnowsze wydarzenia",
  [ContentType.Trip]: "Najnowsze tripy",
};

export const HomeMainContent = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [lastSeenId, setLastSeenId] = useState<string | null>(null);
  const [localContent, setLocalContent] = useState<TContentData[]>([]);
  const [activeFilter, setActiveFilter] = useState<ContentType | "All">("All");

  const lastElementRef = useRef<HTMLDivElement>(null);
  const isLastElementVisible = useOnScreen(lastElementRef);
  const t = useTranslations();

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useMainContent();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      const all = (data as any)?.pages?.flatMap((page: any) => page.data) ?? [];
      console.log(all, "test");
      setLocalContent(all);
    }
  }, [data]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (
      !hasNextPage ||
      isLoading ||
      !isLastElementVisible ||
      localContent.length === 0
    )
      return;

    const lastContentId = localContent[localContent.length - 1].data.id;
    if (lastSeenId === lastContentId) return;

    setLastSeenId(lastContentId);
    fetchNextPage();
  }, [isLastElementVisible]);

  useEffect(() => {
    const lastClickedId = sessionStorage.getItem("lastClickedId");

    if (lastClickedId) {
      const scrollToElement = () => {
        const element = document.getElementById(`content-${lastClickedId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          sessionStorage.removeItem("lastClickedId");
        }
      };

      setTimeout(scrollToElement, 300);
    }
  }, [isLoading, data]);

  useEffect(() => {
    const getUser = async () => {
      setUserId((await getLoggedInUser())?.user.$id ?? null);
    };

    getUser();
  }, []);

  const filteredContent = localContent.filter((item) => {
    if (activeFilter === "All") return true;
    return item.type === activeFilter;
  });

  const onDelete = (id: string) => {
    queryClient.setQueryData([QUERY_KEY_MAIN_CONTENT], (oldData: any) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map((page: MainContentResponse) => ({
          ...page,
          data: page.data.filter((el) => el.data.id !== id),
        })),
      };
    });
  };

  return (
    <div
      id="content-container"
      className="flex w-full items-center lg:pr-[150px] h-full max-h-screen custom-scrollbar overflow-y-auto flex-col scroll-smooth"
    >
      <div className="flex flex-col text-[12px] w-full lg:w-[570px]">
        <div className="hidden max-lg:flex items-center justify-between p-4 pb-0">
          <div className="items-center gap-4 flex">
            <Image src={Logo} alt="logo" width={25} height={25} />
            <span className={`text-md uppercase` + Yant.className}>
              Automotiveplace
            </span>
          </div>
          <IoNotifications size={iconSizes.base} className="opacity-80" />
        </div>
        <ContentTypeFilter active={activeFilter} onChange={setActiveFilter} />
        {activeFilter !== "All" && (
          <div className="font-semibold text-xl my-2 mx-2">
            {headerMap[activeFilter]}
          </div>
        )}
        {filteredContent.map((item, i: number) => (
          <div
            key={i}
            className="flex w-full items-center justify-center py-1"
            id={`content-${item.data.id}`}
          >
            <div className="flex w-full border-t-2 border-amp-50 rounded-md">
              <ContentSelect
                content={item}
                userId={userId}
                onDelete={onDelete}
              />
            </div>
          </div>
        ))}

        <div ref={lastElementRef} className="py-2" />

        {!isLoading && !hasNextPage && (
          <div className="text-center text-sm text-gray-500 pb-4">
            {t("Core.NoMoreResults")}
          </div>
        )}

        {(isLoading || isFetchingNextPage) && (
          <>
            {localContent.length > 3 ? (
              <LoadingMiniView />
            ) : (
              <>
                <LoadingMiniView />
                <LoadingMiniView />
                <LoadingMiniView />
                <LoadingMiniView />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export const ContentSelect = ({
  content: { data, type },
  userId,
  onDelete,
}: {
  content: TContentData;
  userId: string | null;
  onDelete?: (id: string) => void;
}) => {
  const errorText = " data is not valid";
  switch (type) {
    case ContentType.Project:
      if (isTBasicProject(data)) {
        return (
          <ProjectMiniView
            data={data}
            isUserContent={userId === data.author.id}
            onDelete={onDelete}
          />
        );
      }
      console.error(type, errorText);
      return null;
    case ContentType.Problem:
      if (isTProblem(data)) {
        return <ProblemMiniView data={data} isUserContent={false} />;
      }
      console.error(type, errorText);
      return null;
    case ContentType.Post:
      if (isTBasicPost(data)) {
        return (
          <PostMiniView
            data={data}
            isUserContent={userId === data.author.id}
            onDelete={onDelete}
          />
        );
      }
      console.error(type, errorText);
      return null;
    case ContentType.Spot:
      if (isTSpot(data)) {
        return <SpotMiniView data={data} isUserContent={false} />;
      }
      console.error(type, errorText);
      return null;
    case "CarItem":
      if (isTCarItem(data)) {
        return <CarItemMiniView data={data} isUserContent={false} />;
      }
      console.error(type, errorText);
      return null;
    default:
      return null;
  }
};
