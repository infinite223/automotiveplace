import { TCarItem } from "@/app/utils/types/carItem";

export const CarItemMiniView = ({ data }: { data: TCarItem }) => {
  return (
    <div className="flex">
      <nav>
        <h2>{data.name}</h2>
      </nav>
      <p>{data.description}</p>
    </div>
  );
};
