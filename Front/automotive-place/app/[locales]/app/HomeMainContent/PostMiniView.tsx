import { TBasicPost } from "@/app/utils/types/post";
import { ContentMiniFooter } from "./ContentMiniFooter";
import { ContentMiniNav } from "./ContentMiniNav";

export const PostMiniView = ({ data }: { data: TBasicPost }) => {
  return (
    <div className="flex flex-col w-full gap-1">
      <ContentMiniNav
        createdAt={data.lastUpdateAt}
        title={data.title}
        typeName="Post"
        // author={data.}
      />
      <p>{data.content}</p>
      <ContentMiniFooter
        isLikedByAuthUser={false}
        likesCount={data.likesCount}
        type="Post"
      />
    </div>
  );
};
