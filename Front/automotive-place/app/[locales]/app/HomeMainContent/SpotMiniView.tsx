import { TSpot } from "@/app/utils/types/spot";
import { ContentMiniFooter } from "./ContentMiniFooter";
import { ContentMiniNav } from "./ContentMiniNav";

export const SpotMiniView = ({
  data,
  isUserContent,
}: {
  data: TSpot;
  isUserContent: boolean;
}) => {
  return (
    <div className="flex flex-col items-center h-[550px] w-full gap-1">
      <ContentMiniNav
        createdAt={data.createdAt}
        title={data.title}
        typeName="Spot"
        isUserContent={isUserContent}
        // author={data.}
      />
      <h2 className="h-full">Spot</h2>
      <ContentMiniFooter
        contentId={data.id}
        isLikedByAuthUser={false}
        likesCount={12}
        type="Spot"
      />
    </div>
  );
};
