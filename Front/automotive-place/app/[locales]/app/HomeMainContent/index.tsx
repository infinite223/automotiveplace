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
import { useMainContent } from "@/app/hooks/useMainContent";

export const HomeMainContent = () => {
  const lastElementRef = useRef<HTMLDivElement>(null);
  const [lastSeenId, setLastSeenId] = useState<string | null>(null);
  const isLastElementVisible = useOnScreen(lastElementRef);
  const [userId, setUserId] = useState<string | null>(null);
  const t = useTranslations();

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useMainContent();

  const pages = (data as any)?.pages ?? [];
  const content = pages.flatMap((page: any) => page.data);

  useEffect(() => {
    if (
      !hasNextPage ||
      isLoading ||
      !isLastElementVisible ||
      content.length === 0
    )
      return;

    const lastContentId = content[content.length - 1].id;
    if (lastSeenId === lastContentId) return;

    setLastSeenId(lastContentId);
    fetchNextPage();
  }, [isLastElementVisible]);

  useEffect(() => {
    const lastClickedId = sessionStorage.getItem("lastClickedId");

    if (lastClickedId) {
      const scrollToElement = () => {
        const element = document.getElementById(`content-${lastClickedId}`);
        console.log(lastClickedId, element, "element");
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

  return (
    <div className="flex w-full items-center lg:pr-[150px] h-full max-h-screen custom-scrollbar overflow-y-auto flex-col scroll-smooth">
      <div className="flex flex-col text-[12px] w-full lg:w-[570px]">
        {content.map((item: any) => (
          <div
            key={item.id}
            className="flex w-full items-center justify-center py-1"
            id={`content-${item.data.id}`}
          >
            <div className="flex w-full bg-amp-50 rounded-md">
              <ContentSelect content={item} userId={userId} />
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
            <LoadingMiniView />
            <LoadingMiniView />
            <LoadingMiniView />
            <LoadingMiniView />
            <LoadingMiniView />
          </>
        )}
      </div>
    </div>
  );
};

export const ContentSelect = ({
  content: { data, type },
  userId,
}: {
  content: TContentData;
  userId: string | null;
}) => {
  const errorText = " data is not valid";
  switch (type) {
    case ContentType.Project:
      if (isTBasicProject(data)) {
        return (
          <ProjectMiniView
            data={data}
            isUserContent={userId === data.author.id}
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
          <PostMiniView data={data} isUserContent={userId === data.author.id} />
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
