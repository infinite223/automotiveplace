import { TPost } from "@/app/utils/types/post";
import { TProject } from "@/app/utils/types/project";

export const PostMiniView = ({ data }: { data: TPost }) => {
  return (
    <div className="flex">
      <nav>
        <h2>{data.title}</h2>
      </nav>
      <p>{data.description}</p>
    </div>
  );
};
