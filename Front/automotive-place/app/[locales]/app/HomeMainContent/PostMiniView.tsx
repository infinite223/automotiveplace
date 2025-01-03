import { TPost } from "@/app/utils/types/post";
import { ContentMiniFooter } from "./ContentMiniFooter";
import { ContentMiniNav } from "./ContentMiniNav";

export const PostMiniView = ({ data }: { data: TPost }) => {
  return (
    <div className="flex flex-col items-center h-[350px] w-full gap-1">
      <ContentMiniNav
        createdAt={data.createdAt}
        title={data.title}
        typeName="Post"
        // author={data.}
      />
      <h2 className="h-full">Post</h2>

      <ContentMiniFooter
        isLikedByAuthUser={false}
        likesCount={12}
        type="Post"
      />
    </div>
  );
};
