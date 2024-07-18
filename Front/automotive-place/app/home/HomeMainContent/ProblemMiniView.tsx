import { TProblem } from "@/app/utils/types/problem";
import { ContentMiniFooter } from "./ContentMiniFooter";
import { ContentMiniNav } from "./ContentMiniNav";

export const ProblemMiniView = ({ data }: { data: TProblem }) => {
  return (
    <div className="flex flex-col items-center h-[250px] w-full py-2 gap-1">
      <ContentMiniNav
        createdAt={data.createdAt}
        title={data.title}
        typeName="Problem"
        // author={data.}
      />
      <h2 className="h-full">Problem</h2>

      <ContentMiniFooter
        isLikedByAuthUser={false}
        likesCount={12}
        type="Problem"
      />
    </div>
  );
};
