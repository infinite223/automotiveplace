import { TSpot } from "@/app/utils/types/spot";
import { ContentMiniFooter } from "./ContentMiniFooter";
import { ContentMiniNav } from "./ContentMiniNav";
import { useLike } from "@/app/hooks/useLike";
import { ContentType } from "@/app/utils/enums";

export const SpotMiniView = ({
  data,
  isUserContent,
}: {
  data: TSpot;
  isUserContent: boolean;
}) => {
  const { currentIsLiked, currentLikesCount, handleClickLike } = useLike(
    2,
    false,
    data.id,
    ContentType.Spot,
    []
  );

  const handleClickInterestingContent = () => {};

  return (
    <div className="flex flex-col items-center h-[550px] w-full gap-1">
      <ContentMiniNav
        createdAt={data.createdAt}
        title={data.title}
        typeName="Spot"
        isUserContent={isUserContent}
        handleClickInterestingContent={handleClickInterestingContent}
        // author={data.}
      />
      <h2 className="h-full">Spot</h2>
      <ContentMiniFooter
        isUserContent={isUserContent}
        currentIsLiked={currentIsLiked}
        currentLikesCount={currentLikesCount}
        handleClickLike={handleClickLike}
        type="Spot"
      />
    </div>
  );
};
