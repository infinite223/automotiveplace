"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { PiPaintBrush } from "react-icons/pi";
import { BiEdit, BiTrash, BiPlus } from "react-icons/bi";

import { AMPEmptyState } from "@/app/components/shared/AMPEmptyState";
import AMPSlider from "@/app/components/shared/AMPSlider";
import AMPModal from "@/app/components/shared/AMPModal";
import { AMPMenu } from "@/app/components/shared/AMPMenu";
import { VisualModificationForm } from "@/app/components/createProject/steps/VisualModificationForm";

import { getProjectImageSrcByFileId } from "@/app/utils/helpers/storageHelper";
import {
  TBasicVisualModification,
  TVisualModificationCreate,
  TVisualModificationType,
  visualTypeTranslations,
} from "@/app/utils/types/visualModification";
import { addNotification } from "@/lib/features/notifications/notificationsSlice";
import { Status } from "@/app/utils/enums";
import { iconSizes } from "@/app/utils/constants";

import {
  CreateVisualModification,
  EditVisualModification,
  RemoveVisualModification,
  uploadImageProject,
} from "@/app/services/project";
import {
  setIsLoading,
  setLoadingText,
} from "@/lib/features/loading/globalLoadingSlice";

interface VisualModsTabProps {
  modifications: TBasicVisualModification[];
  isMyProject?: boolean;
  projectId: string;
}

const INITIAL_STATE: TVisualModificationCreate = {
  name: "",
  modificationType: TVisualModificationType.OTHER,
  description: "",
  imageFile: null,
  isVisible: true,
  images: [],
};

export default function VisualModsTab({
  modifications,
  isMyProject,
  projectId,
}: VisualModsTabProps) {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modsList, setModsList] =
    useState<TBasicVisualModification[]>(modifications);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] =
    useState<TVisualModificationCreate>(INITIAL_STATE);

  const openAddModal = () => {
    setEditingId(null);
    setFormData(INITIAL_STATE);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(INITIAL_STATE);
    setEditingId(null);
  };

  const handleEditClick = (mod: TBasicVisualModification) => {
    setEditingId(mod.id);
    setFormData({
      name: mod.name,
      modificationType: mod.modificationType,
      description: mod.description || "",
      imageFile: (mod.images?.[0]
        ? getProjectImageSrcByFileId(mod.images[0])
        : null) as any,
      isVisible: mod.isVisible,
      images: mod.images || [],
    });
    setIsModalOpen(true);
  };

  const handleFormChange = (
    field: keyof TVisualModificationCreate,
    value: any,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    dispatch(setIsLoading(true));
    dispatch(setLoadingText("Zapisywanie zmian..."));

    try {
      const action = editingId
        ? EditVisualModification({ ...formData, id: editingId })
        : CreateVisualModification({ ...formData, projectId });

      const result = await action;

      if (result.notification.log.status === Status.Success) {
        let updatedMod = { ...result.modification };

        if (formData.imageFile instanceof File) {
          dispatch(setLoadingText("Przesyłanie zdjęcia..."));

          const fileData = new FormData();
          fileData.append("files", formData.imageFile);

          const modId = editingId || result.modification.id;

          const uploadRes = await uploadImageProject(
            projectId,
            fileData,
            undefined,
            modId,
          );

          if (uploadRes?.success && uploadRes.files) {
            const newImages = uploadRes.files.map((f: any) => f.fileLocation);

            updatedMod = {
              ...updatedMod,
              images: newImages,
            };
          }
        }

        if (editingId) {
          setModsList((prev) =>
            prev.map((m) => (m.id === editingId ? updatedMod : m)),
          );
        } else {
          setModsList((prev) => [...prev, updatedMod]);
        }

        dispatch(addNotification(JSON.stringify(result.notification)));
        closeModal();
      }
    } catch (error) {
      console.error("Błąd podczas zapisu:", error);
    } finally {
      dispatch(setIsLoading(false));
      dispatch(setLoadingText(""));
    }
  };

  const handleDelete = async (id: string) => {
    const result = await RemoveVisualModification(id);
    dispatch(addNotification(JSON.stringify(result.notification)));

    if (result.notification.log.status === Status.Success) {
      setModsList((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="flex flex-col w-full py-2">
      <div className="flex justify-between items-end mb-6 px-1">
        <h3 className="text-md font-semibold">Zmiany wizualne projektu</h3>
      </div>

      {modsList.length === 0 ? (
        <AMPEmptyState
          icon={PiPaintBrush}
          title="Brak modyfikacji wizualnych"
          description="Nie odnotowano jeszcze zmian stylistycznych"
          isMyProject={isMyProject}
          buttonLabel="Dodaj pierwszą modyfikację"
          onButtonClick={openAddModal}
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
          {modsList.map((mod) => (
            <div
              key={mod.id}
              className="group relative flex flex-col dark:bg-amp-50 rounded-sm overflow-hidden shadow-sm"
            >
              {isMyProject && (
                <div className="absolute top-3 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <AMPMenu
                    isLoading={false}
                    items={[
                      {
                        name: "Edytuj",
                        icon: <BiEdit size={iconSizes.small} />,
                        handleClick: () => handleEditClick(mod),
                      },
                      {
                        name: "Usuń",
                        icon: <BiTrash size={iconSizes.small} />,
                        handleClick: () => handleDelete(mod.id),
                      },
                    ]}
                  />
                </div>
              )}

              <div className="w-full aspect-square md:h-[200px] bg-black/20">
                {mod.images && mod.images.length > 0 ? (
                  <AMPSlider
                    images={mod.images
                      .map((imgId) => imgId)
                      .filter((url): url is string => url !== null)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center opacity-30">
                    <PiPaintBrush size={24} className="text-white" />
                    <span className="text-[10px] mt-1 text-white">
                      Brak zdjęć
                    </span>
                  </div>
                )}
              </div>

              <div className="p-3 md:p-5 flex flex-col flex-grow">
                <span className="text-[8px] md:text-[10px] uppercase font-bold opacity-70 tracking-widest mb-1 truncate">
                  {visualTypeTranslations[mod.modificationType]}
                </span>
                <h3 className="font-bold text-sm md:text-lg text-white leading-tight uppercase truncate">
                  {mod.name}
                </h3>
                {mod.description && (
                  <p className="text-[10px] md:text-sm opacity-70 line-clamp-2 mt-2 leading-relaxed">
                    {mod.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {isMyProject && modsList.length > 0 && (
        <button
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-amp-500 flex items-center justify-center shadow-[0_0_20px_rgba(219,31,72,0.5)] hover:scale-105 active:scale-95 transition"
          onClick={openAddModal}
        >
          <BiPlus size={28} className="text-white" />
        </button>
      )}

      <AMPModal
        title={editingId ? "Edytuj modyfikację" : "Dodaj modyfikację wizualną"}
        visible={isModalOpen}
        onClose={closeModal}
        withHeader
        bgOnClickClose={false}
        additionalTailwindCss="bg-amp-50 p-2 pb-4"
      >
        <div className="p-4">
          <VisualModificationForm
            modification={formData}
            index={0}
            onChange={handleFormChange}
            onRemove={closeModal}
            onAdd={handleSubmit}
            isLast={true}
            isSingleMode={true}
            editMode={!!editingId}
          />
        </div>
      </AMPModal>
    </div>
  );
}
