import { CarItemMiniView } from "@/app/[locales]/app/HomeMainContent/CarItemMiniView";
import { AMPButton } from "@/app/components/shared/AMPButton";
import { TCarItem } from "@/app/utils/types/carItem";
import { LuPackageOpen } from "react-icons/lu";

export const CarItemsTab = ({
  carItems,
  isUserContent,
}: {
  carItems: TCarItem[];
  isUserContent: boolean;
}) => {
  if (carItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 m-3 border-amp-700 rounded-md bg-amp-50">
        <LuPackageOpen className="w-12 h-12 mb-4 opacity-20" />
        <p className="text-lg font-medium text-center px-4">
          Nie dodałeś jeszcze żadnych części do swojego garażu
        </p>
        <p className="text-sm opacity-60 mb-6">Wstaw części które posiadasz</p>
        {isUserContent && <AMPButton name="Dodaj część" />}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {carItems.map((carItem) => (
        <CarItemMiniView
          key={carItem.id}
          data={carItem}
          isUserContent={isUserContent}
        />
      ))}
    </div>
  );
};
