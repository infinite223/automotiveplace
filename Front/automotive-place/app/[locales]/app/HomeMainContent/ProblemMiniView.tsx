import { TProblem } from "@/app/utils/types/problem";
import { ContentMiniFooter } from "./ContentMiniFooter";
import { ContentMiniNav } from "./ContentMiniNav";
import { useLike } from "@/app/hooks/useLike";
import { ContentType } from "@/app/utils/enums";

export const ProblemMiniView = ({
  data,
  isUserContent,
}: {
  data: TProblem;
  isUserContent: boolean;
}) => {
  const { currentIsLiked, currentLikesCount, handleClickLike } = useLike(
    2,
    false,
    data.id,
    ContentType.Problem,
    []
  );

  return (
    <div className="flex flex-col items-center h-[250px] w-full gap-1">
      <ContentMiniNav
        createdAt={data.createdAt}
        title={data.title}
        typeName="Problem"
        isUserContent={isUserContent}
        // author={data.}
      />
      <h2 className="h-full">Problem</h2>

      <ContentMiniFooter
        isUserContent={isUserContent}
        currentIsLiked={currentIsLiked}
        currentLikesCount={currentLikesCount}
        handleClickLike={handleClickLike}
        type="Problem"
      />
    </div>
  );
};
