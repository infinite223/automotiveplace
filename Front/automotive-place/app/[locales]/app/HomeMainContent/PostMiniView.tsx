import { TBasicPost } from "@/app/utils/types/post";
import { ContentMiniFooter } from "./ContentMiniFooter";
import { ContentMiniNav } from "./ContentMiniNav";
import AMPSlider from "@/app/components/shared/AMPSlider";
import { useLike } from "@/app/hooks/useLike";
import { ContentType } from "@/app/utils/enums";

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
    ContentType.Post,
    data.tags
  );

  const handleClickInterestingContent = () => {};

  return (
    <div className="flex flex-col w-full gap-1">
      <ContentMiniNav
        createdAt={data.lastUpdateAt}
        handleClickInterestingContent={handleClickInterestingContent}
        title={data.title}
        typeName={ContentType.Post}
        isUserContent={isUserContent}
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
