import { TProblem } from "@/app/utils/types/problem";

export const ProblemMiniView = ({ data }: { data: TProblem }) => {
  return (
    <div className="flex flex-col items-center h-[250px]">
      <nav>
        <h2>{data.title}</h2>
      </nav>
      <p>{data.description}</p>

      <h2>Problem</h2>
    </div>
  );
};
