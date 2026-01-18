import { useState } from "react";
import AMPModal from "@/app/components/shared/AMPModal";
import { TCarItemCreate } from "@/app/utils/types/carItem";
import { CreateCarItemView } from "../../createCarItem";

interface Props {
  visible: boolean;
  onClose: () => void;
  onAdd: (item: TCarItemCreate) => void;
}

export const AddCarItemModal = ({ visible, onClose, onAdd }: Props) => {
  const [item, setItem] = useState<TCarItemCreate | null>(null);

  const handleAdd = (carItem: TCarItemCreate) => {
    onAdd({ ...carItem, tags: [] });
    onClose();
  };

  return (
    <AMPModal
      visible={visible}
      onClose={onClose}
      withHeader
      title="Dodaj element do stage"
      additionalTailwindCss="max-w-[700px] relative bg-amp-700 dark:bg-amp-50 rounded-md"
    >
      <CreateCarItemView onSubmitLocal={handleAdd} onCancel={onClose} />
    </AMPModal>
  );
};
