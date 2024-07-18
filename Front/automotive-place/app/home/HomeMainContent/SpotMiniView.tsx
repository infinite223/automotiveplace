import { TSpot } from "@/app/utils/types/spot";
import { ContentMiniFooter } from "./ContentMiniFooter";
import { ContentMiniNav } from "./ContentMiniNav";

export const SpotMiniView = ({ data }: { data: TSpot }) => {
  return (
    <div className="flex flex-col items-center h-[550px] w-full py-2 gap-1">
      <ContentMiniNav
        createdAt={data.createdAt}
        title={data.title}
        typeName="Spot"
        // author={data.}
      />
      <h2 className="h-full">Spot</h2>
      <ContentMiniFooter
        isLikedByAuthUser={false}
        likesCount={12}
        type="Spot"
      />
    </div>
  );
};
