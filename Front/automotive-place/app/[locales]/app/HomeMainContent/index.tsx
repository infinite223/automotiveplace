"use client";

import React, { useEffect } from "react";
import { TContentData } from "../../../utils/types";
import { isTProject } from "../../../utils/types/project";
import { ProjectMiniView } from "./ProjectMiniView";
import { isTPost } from "@/app/utils/types/post";
import { PostMiniView } from "./PostMiniView";
import { ProblemMiniView } from "./ProblemMiniView";
import { isTProblem } from "@/app/utils/types/problem";
import { isTSpot } from "@/app/utils/types/spot";
import { SpotMiniView } from "./SpotMiniView";
import { CarItemMiniView } from "./CarItemMiniView";
import { isTCarItem } from "@/app/utils/types/carItem";
import { LoadingMiniView } from "./LoadingMiniView";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchProjects, setPage } from "@/lib/features/content/contentSlice";

export const HomeMainContent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const _content = useSelector(
    (state: RootState) => state.contentData.contentData
  );
  const isLoading = useSelector(
    (state: RootState) => state.contentData.isLoading
  );
  const page = useSelector((state: RootState) => state.contentData.page);

  useEffect(() => {
    if (_content.length === 0) {
      dispatch(fetchProjects(page));
    }
  }, [dispatch, page, _content.length]);

  useEffect(() => {
    const lastClickedId = sessionStorage.getItem("lastClickedId");
    if (lastClickedId) {
      const scrollToElement = () => {
        const element = document.getElementById(`content-${lastClickedId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      };

      setTimeout(scrollToElement, 100);
    }
  }, []);

  const loadMoreProjects = () => {
    dispatch(setPage(page + 1));
    dispatch(fetchProjects(page + 1));
  };

  // mr-[140px] max-lg:mr-0 max-2xl:mr-[80px] max-xl:mr-[75px]
  return (
    <div className="flex w-full items-center lg:pr-[150px] h-full max-h-screen custom-scrollbar overflow-y-auto flex-col scroll-smooth">
      <div className="flex flex-col text-[12px] w-full lg:w-[650px]">
        {!isLoading &&
          _content.map((content) => {
            return (
              <div
                key={content.data.id}
                className="flex w-full items-center justify-center py-1 "
                id={`content-${content.data.id}`}
              >
                <div className="flex w-full bg-amp-50 p-2 rounded-md">
                  <ContentSelect content={content} />
                </div>
              </div>
            );
          })}

        {isLoading && (
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
}: {
  content: TContentData;
}) => {
  const errorText = " data is not valid";
  switch (type) {
    case "Project":
      const contentDataIsProject = isTProject(data);

      if (contentDataIsProject) {
        return <ProjectMiniView data={data} />;
      }

      console.error(type, errorText);
      return null;
    case "Problem":
      const contentDataIsProblem = isTProblem(data);

      if (contentDataIsProblem) {
        return <ProblemMiniView data={data} />;
      }

      console.error(type, errorText);
      return null;
    case "Post":
      const contentDataIsPost = isTPost(data);

      if (contentDataIsPost) {
        return <PostMiniView data={data} />;
      }

      console.error(type, errorText);
      return null;
    case "Spot":
      const contentDataIsSpot = isTSpot(data);

      if (contentDataIsSpot) {
        return <SpotMiniView data={data} />;
      }

      console.error(type, errorText);
      return null;
    case "CarItem":
      const contentDataIsCarItem = isTCarItem(data);

      if (contentDataIsCarItem) {
        return <CarItemMiniView data={data} />;
      }

      console.error(type, errorText);
      return null;
    default:
      return null;
  }
};
