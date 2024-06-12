import { TProblem } from "@/app/utils/types/problem";

export const ProblemMiniView = ({ data }: { data: TProblem }) => {
  return (
    <div className="flex">
      <nav>
        <h2>{data.title}</h2>
      </nav>
      <p>{data.description}</p>
    </div>
  );
};
