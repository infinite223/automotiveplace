import React, {FC} from "react";
import DeletePostButton from "./DeletePostButton";
type TPost = {
  id: string;
};

interface IPostProps {
  postData: TPost;
}

export const Post: FC<IPostProps> = ({postData: {id}}) => {
  return (
    <div className="bg-slate-100 min-w-20 min-h-10 ">
      <h3>New project</h3>

      <DeletePostButton postId={id} />
    </div>
  );
};
