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

export const PostMiniView = ({
  data,
  isUserContent,
  onDelete,
}: {
  data: TBasicPost;
  isUserContent: boolean;
  onDelete?: (id: string) => void;
}) => {
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
      const res = await deletePost(data.id);

      const newN = CreateNotification(Status.Success, res.message);
      dispatch(addNotification(JSON.stringify(newN)));
      // queryClient.invalidateQueries({ queryKey: [QUERY_KEY_POPULAR_PROJECTS] });

      if (onDelete) onDelete(data.id);
    } catch (error: any) {
      console.log(error, "error");
      const newN = CreateNotification(Status.Low, error);
      dispatch(addNotification(JSON.stringify(newN)));
    }
  };

  return (
    <div className="flex flex-col w-full gap-1">
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
