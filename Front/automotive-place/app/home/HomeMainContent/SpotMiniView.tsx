import { TSpot } from "@/app/utils/types/spot";

export const SpotMiniView = ({ data }: { data: TSpot }) => {
  return (
    <div className="flex flex-col items-center">
      <nav>
        <h2>{data.title}</h2>
      </nav>
      <p>{data.description}</p>
      <h2>Spot</h2>
    </div>
  );
};
