import { TPost } from "@/app/utils/types/post";

export const PostMiniView = ({ data }: { data: TPost }) => {
  return (
    <div className="flex flex-col items-center">
      <nav>
        <h2>{data.title}</h2>
      </nav>
      <p>{data.description}</p>
      <h2>Post</h2>
    </div>
  );
};
