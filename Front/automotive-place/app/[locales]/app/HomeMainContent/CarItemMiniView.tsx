import { TCarItem } from "@/app/utils/types/carItem";

export const CarItemMiniView = ({
  data,
  isUserContent,
}: {
  data: TCarItem;
  isUserContent: boolean;
}) => {
  return (
    <div className="flex flex-col items-center">
      <nav>
        <h2>{data.name}</h2>
      </nav>
      <p>{data.description}</p>
      <h2>Podzespół</h2>
    </div>
  );
};
