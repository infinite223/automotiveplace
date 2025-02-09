import { TBasicPost } from "@/app/utils/types/post";
import { ContentMiniFooter } from "./ContentMiniFooter";
import { ContentMiniNav } from "./ContentMiniNav";
import AMPSlider from "@/app/components/shared/AMPSlider";

export const PostMiniView = ({
  data,
  isUserContent,
}: {
  data: TBasicPost;
  isUserContent: boolean;
}) => {
  return (
    <div className="flex flex-col w-full gap-1">
      <ContentMiniNav
        createdAt={data.lastUpdateAt}
        title={data.title}
        typeName="Post"
        isUserContent={isUserContent}
        author={data.author}
      />
      <p className="mt-1 opacity-80">{data.content}</p>
      {data.imagesUrl && <AMPSlider images={[data.imagesUrl]} />}

      <ContentMiniFooter
        contentId={data.id}
        isLikedByAuthUser={data.isLikedByAuthUser}
        likesCount={data.likesCount}
        type="Post"
      />
    </div>
  );
};
