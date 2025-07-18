import { useState } from "react";
import { createLike, deleteLike } from "@/app/services/like";
import { TContentTypes } from "../utils/types";
import { TBasicTag } from "../utils/types/tag";

export const useLike = (
  initialLikesCount: number,
  initialIsLiked: boolean,
  id: string,
  type: TContentTypes,
  tags: TBasicTag[]
) => {
  const [currentLikesCount, setCurrentLikesCount] = useState(initialLikesCount);
  const [currentIsLiked, setCurrentIsLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickLike = async () => {
    console.log("test", initialLikesCount, initialIsLiked, id, tags);
    if (isLoading) return;
    setIsLoading(true);

    if (currentIsLiked) {
      setCurrentLikesCount((prev) => prev - 1);
      setCurrentIsLiked(false);
      try {
        await deleteLike(id);
      } catch (error) {
        console.error("Error while deleting like", error);
        setCurrentLikesCount((prev) => prev + 1);
        setCurrentIsLiked(true);
      }
    } else {
      setCurrentLikesCount((prev) => prev + 1);
      setCurrentIsLiked(true);
      try {
        await createLike(id, type, tags);
      } catch (error) {
        console.error("Error while creating like", error);
        setCurrentLikesCount((prev) => prev - 1);
        setCurrentIsLiked(false);
      }
    }
    setIsLoading(false);
  };

  return { currentLikesCount, currentIsLiked, isLoading, handleClickLike };
};
