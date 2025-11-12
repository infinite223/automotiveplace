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
  const [localContent, setLocalContent] = useState<TContentData[]>([]);
  const [initialized, setInitialized] = useState(false);

  const isLastElementVisible = useOnScreen(lastElementRef);
  const [userId, setUserId] = useState<string | null>(null);
  const t = useTranslations();

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useMainContent();

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

  return (
    <div
      id="content-container"
      className="flex w-full items-center lg:pr-[150px] h-full max-h-screen custom-scrollbar overflow-y-auto flex-col scroll-smooth"
    >
      <div className="flex flex-col text-[12px] w-full lg:w-[570px]">
        {localContent.map((item, i: number) => (
          <div
            key={i}
            className="flex w-full items-center justify-center py-1"
            id={`content-${item.data.id}`}
          >
            <div className="flex w-full bg-amp-50 rounded-md">
              <ContentSelect
                content={item}
                userId={userId}
                onDelete={(id) =>
                  setLocalContent((prev) =>
                    prev.filter((el) => el.data.id !== id)
                  )
                }
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
