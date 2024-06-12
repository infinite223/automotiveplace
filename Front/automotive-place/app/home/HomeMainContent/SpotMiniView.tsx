import { TSpot } from "@/app/utils/types/spot";

export const SpotMiniView = ({ data }: { data: TSpot }) => {
  return (
    <div className="flex">
      <nav>
        <h2>{data.title}</h2>
      </nav>
      <p>{data.description}</p>
    </div>
  );
};
