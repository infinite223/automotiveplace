import { TBasicPost } from "@/app/utils/types/post";
import { ContentMiniFooter } from "./ContentMiniFooter";
import { ContentMiniNav } from "./ContentMiniNav";
import AMPSlider from "@/app/components/shared/AMPSlider";
import { useLike } from "@/app/hooks/useLike";
import { ContentType, Status } from "@/app/utils/enums";
import { CreateNotification } from "@/app/components/logger/NotificationHelper";
import { addNotification } from "@/lib/features/notifications/notificationsSlice";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/app/services/post";
import { useState } from "react";

export const PostMiniView = ({
  data,
  isUserContent,
  onDelete,
}: {
  data: TBasicPost;
  isUserContent: boolean;
  onDelete?: (id: string) => void;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const { currentIsLiked, currentLikesCount, handleClickLike } = useLike(
    data.likesCount,
    data.isLikedByAuthUser,
    data.id,
    ContentType.Post,
    data.tags
  );
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleClickInterestingContent = () => {};

  const handleClickDelete = async () => {
    try {
      setIsDeleting(true);

      const res = await deletePost(data.id);

      const newN = CreateNotification(Status.Success, res.message);
      dispatch(addNotification(JSON.stringify(newN)));
      // queryClient.invalidateQueries({ queryKey: [QUERY_KEY_POPULAR_PROJECTS] });

      if (onDelete) onDelete(data.id);
    } catch (error: any) {
      const newN = CreateNotification(Status.Low, error);
      dispatch(addNotification(JSON.stringify(newN)));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`flex flex-col w-full h-full gap-1 transition-opacity duration-300 ${
        isDeleting ? "opacity-40 pointer-events-none" : "opacity-100"
      }`}
    >
      <ContentMiniNav
        createdAt={data.lastUpdateAt}
        handleClickInterestingContent={handleClickInterestingContent}
        title={data.title}
        typeName={ContentType.Post}
        isUserContent={isUserContent}
        handleClickDelete={handleClickDelete}
        author={data.author}
      />
      <p className="mt-1 opacity-80 px-3">{data.content}</p>
      {data.imagesUrl && <AMPSlider images={[data.imagesUrl]} />}

      <ContentMiniFooter
        isUserContent={isUserContent}
        currentIsLiked={currentIsLiked}
        currentLikesCount={currentLikesCount}
        handleClickLike={handleClickLike}
        type={ContentType.Post}
      />
    </div>
  );
};
