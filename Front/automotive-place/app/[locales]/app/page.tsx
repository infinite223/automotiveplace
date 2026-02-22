"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { TContentData } from "@/app/utils/types";
import { isTBasicProject } from "@/app/utils/types/project";
import { ProjectMiniView } from "./HomeMainContent/ProjectMiniView";
import { isTBasicPost } from "@/app/utils/types/post";
import { PostMiniView } from "./HomeMainContent/PostMiniView";
import { ProblemMiniView } from "./HomeMainContent/ProblemMiniView";
import { isTProblem } from "@/app/utils/types/problem";
import { isTSpot } from "@/app/utils/types/spot";
import { SpotMiniView } from "./HomeMainContent/SpotMiniView";
import { CarItemMiniView } from "./HomeMainContent/CarItemMiniView";
import { isTCarItem } from "@/app/utils/types/carItem";
import { LoadingMiniView } from "./HomeMainContent/LoadingMiniView";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import useOnScreen from "@/app/hooks/useOnScreen";
import { ContentType } from "@/app/utils/enums";
import { useTranslations } from "next-intl";
import { MainContentResponse } from "@/app/hooks/useMainContent";
import { ContentTypeFilter } from "./HomeMainContent/ContentTypeFilter";
import { iconSizes } from "@/app/utils/constants";
import Logo from "../../../asets/logo_3.png";
import { Yant } from "@/app/utils/helpers/fontsHelper";
import Image from "next/image";
import { IoNotifications } from "react-icons/io5";
import { useQueryClient } from "@tanstack/react-query";
import { usePosts, useProjects } from "@/app/hooks/useInfiniteContent";

const headerMap: Record<ContentType, string> = {
  [ContentType.Project]: "Najnowsze projekty",
  [ContentType.Post]: "Najnowsze posty",
  [ContentType.Problem]: "Najnowsze problemy",
  [ContentType.Spot]: "Najnowsze spoty",
  [ContentType.Event]: "Najnowsze wydarzenia",
  [ContentType.Trip]: "Najnowsze tripy",
};

const QUERY_KEY_BY_FILTER: Partial<Record<ContentType | "All", string[]>> = {
  [ContentType.Project]: ["projects"],
  [ContentType.Post]: ["posts"],
};

export default function Page() {
  const [userId, setUserId] = useState<string | null>(null);
  const [lastSeenId, setLastSeenId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<ContentType | "All">(
    ContentType.Project,
  );

  const lastElementRef = useRef<HTMLDivElement>(null);
  const isLastElementVisible = useOnScreen(lastElementRef);
  const t = useTranslations();

  const queryClient = useQueryClient();
  const projectsQuery = useProjects(activeFilter === ContentType.Project);
  const postsQuery = usePosts(activeFilter === ContentType.Post);

  const activeQuery =
    activeFilter === ContentType.Project
      ? projectsQuery
      : activeFilter === ContentType.Post
        ? postsQuery
        : null;

  const data = activeQuery?.data;
  const fetchNextPage = activeQuery?.fetchNextPage;
  const hasNextPage = activeQuery?.hasNextPage;
  const isLoading = activeQuery?.isLoading ?? false;
  const isFetchingNextPage = activeQuery?.isFetchingNextPage ?? false;

  const content = useMemo<TContentData[]>(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (
      !hasNextPage ||
      isLoading ||
      !isLastElementVisible ||
      content.length === 0
    )
      return;

    const lastContentId = content[content.length - 1].data.id;
    if (lastSeenId === lastContentId) return;

    setLastSeenId(lastContentId);
    fetchNextPage?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLastElementVisible]);

  useEffect(() => {
    const getUser = async () => {
      setUserId((await getLoggedInUser())?.user.$id ?? null);
    };

    getUser();
  }, []);

  const filteredContent = content.filter((item) => {
    if (activeFilter === "All") return true;
    return item.type === activeFilter;
  });

  const onDelete = (id: string) => {
    const keys = QUERY_KEY_BY_FILTER[activeFilter];

    queryClient.setQueryData(keys!, (oldData: any) => {
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
      className="flex w-full md:pt-16 items-center lg:pr-[150px] h-full max-h-screen max-md:custom-scrollbar max-md:no-scrollbar overflow-y-auto flex-col scroll-smooth"
    >
      <div className="flex flex-col text-[12px] w-full lg:w-[570px] pb-4">
        <div className="hidden max-lg:flex items-center justify-between p-4 pb-0 max-md:mb-14">
          <div className="items-center gap-4 flex">
            <Image src={Logo} alt="logo" width={28} height={28} />
            <span className={`text-md uppercase` + Yant.className}>
              Automotiveplace
            </span>
          </div>
          <div className="flex gap-5 items-center">
            {/* <TbMessage2Up size={iconSizes.base} className="opacity-80" /> */}
            <IoNotifications size={iconSizes.base} className="opacity-80" />
          </div>
        </div>
        <ContentTypeFilter active={activeFilter} onChange={setActiveFilter} />
        {activeFilter !== "All" && (
          <div className="font-semibold text-lg my-2 mx-2">
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
            {content.length > 3 ? (
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
}

const ContentSelect = ({
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
      console.error(type, errorText, data);
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
