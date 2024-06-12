import { TProject } from "@/app/utils/types/project";

export const ProjectMiniView = ({ data }: { data: TProject }) => {
  return (
    <div className="flex">
      <nav>
        <h2>
          {data.carMake} " " {data.model}
        </h2>
      </nav>
      <p>{data.engineStockHp}</p>
    </div>
  );
};
