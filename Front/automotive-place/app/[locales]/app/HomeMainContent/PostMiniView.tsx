import { TBasicPost } from "@/app/utils/types/post";
import { ContentMiniFooter } from "./ContentMiniFooter";
import { ContentMiniNav } from "./ContentMiniNav";
import AMPSlider from "@/app/components/shared/AMPSlider";
import { useLike } from "@/app/hooks/useLike";

export const PostMiniView = ({
  data,
  isUserContent,
}: {
  data: TBasicPost;
  isUserContent: boolean;
}) => {
  const { currentIsLiked, currentLikesCount, handleClickLike } = useLike(
    data.likesCount,
    data.isLikedByAuthUser,
    data.id,
    "Post"
  );

  return (
    <div className="flex flex-col w-full gap-1">
      <ContentMiniNav
        createdAt={data.lastUpdateAt}
        handleClickLike={handleClickLike}
        title={data.title}
        typeName="Post"
        isUserContent={isUserContent}
        author={data.author}
      />
      <p className="mt-1 opacity-80">{data.content}</p>
      {data.imagesUrl && <AMPSlider images={[data.imagesUrl]} />}

      <ContentMiniFooter
        currentIsLiked={currentIsLiked}
        currentLikesCount={currentLikesCount}
        handleClickLike={handleClickLike}
        type="Post"
      />
    </div>
  );
};
