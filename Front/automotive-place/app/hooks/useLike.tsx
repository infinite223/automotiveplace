import { useState, useCallback } from "react";
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

  const handleClickLike = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);

    const nextIsLiked = !currentIsLiked;
    const diff = nextIsLiked ? 1 : -1;

    setCurrentIsLiked(nextIsLiked);
    setCurrentLikesCount((prev) => prev + diff);

    try {
      if (nextIsLiked) {
        await createLike(id, type, tags);
      } else {
        await deleteLike(id);
      }
    } catch (error) {
      console.error("Like error:", error);

      setCurrentIsLiked(!nextIsLiked);
      setCurrentLikesCount((prev) => prev - diff);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, currentIsLiked, id, type, tags]);

  return {
    currentLikesCount,
    currentIsLiked,
    isLoading,
    handleClickLike,
  };
};
