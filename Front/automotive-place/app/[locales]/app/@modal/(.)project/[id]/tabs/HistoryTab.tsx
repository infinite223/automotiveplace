"use client";

import {
  TBasicHistory,
  THistoryCreate,
  TStepHistoryCreate,
} from "@/app/utils/types/history";
import { BiCalendar, BiWrench, BiPlus } from "react-icons/bi";
import { FaGauge } from "react-icons/fa6";
import { LuBuilding2, LuCircleDollarSign } from "react-icons/lu";
import moment from "moment";
import "moment/locale/pl";
import HistoryChart from "./HistoryChart";
import AMPModal from "@/app/components/shared/AMPModal";
import { useRef, useState } from "react";
import { HistoryForm } from "@/app/components/createProject/steps/HistoryForm";
import { AMPButton } from "@/app/components/shared/AMPButton";
import {
  CreateProjectHistory,
  EditProjectHistory,
  RemoveProjectHistory,
} from "@/app/services/project";
import {
  mapStepHistoryToEditHistory,
  mapStepHistoryToHistory,
} from "@/app/components/createProject/helpers";
import { useDispatch } from "react-redux";
import { addNotification } from "@/lib/features/notifications/notificationsSlice";
import { Status } from "@/app/utils/enums";
import { BiEdit, BiTrash } from "react-icons/bi";
import { AMPMenu } from "@/app/components/shared/AMPMenu";
import { iconSizes } from "@/app/utils/constants";

interface HistoryTabProps {
  history: TBasicHistory[];
  isMyProject: boolean;
  projectId: string;
}

export default function HistoryTab({
  history,
  isMyProject,
  projectId,
}: HistoryTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [historyList, setHistoryList] = useState(
    [...history].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    ),
  );
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [newEntry, setNewEntry] = useState<TStepHistoryCreate>({
    title: "",
    date: new Date().toISOString().split("T")[0],
    mileage: "",
    isVisible: true,
  });
  const dispatch = useDispatch();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewEntry({
      title: "",
      date: new Date().toISOString().split("T")[0],
      mileage: "",
      isVisible: true,
    });
  };

  const handleEdit = (entry: TBasicHistory) => {
    setEditingEntryId(entry.id);

    setNewEntry({
      title: entry.title,
      date: new Date(entry.date).toISOString().split("T")[0],
      mileage: entry.mileage.toString(),
      isVisible: entry.isVisible,
      ...(entry.description ? { description: entry.description } : {}),
      ...(entry.price ? { price: entry.price.toString() } : {}),
    });

    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    console.log(id, "id");
    const result = await RemoveProjectHistory(id);

    dispatch(addNotification(JSON.stringify(result.notification)));
    if (result.notification.log.status === Status.Success) {
      if (result.notification.log.status === Status.Success) {
        setHistoryList((prev) => prev.filter((h) => h.id !== id));
      }
      closeModal();
    }
  };

  const handleFormChange = (
    field: keyof TStepHistoryCreate,
    value: string | boolean,
  ) => {
    setNewEntry((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitAdd = async () => {
    const result = await CreateProjectHistory(
      mapStepHistoryToHistory({ ...newEntry, projectId }),
    );

    dispatch(addNotification(JSON.stringify(result.notification)));
    if (result.notification.log.status === Status.Success) {
      if (result.notification.log.status === Status.Success) {
        setHistoryList((prev) =>
          [...(prev ?? []), result.history].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          ),
        );
      }
      closeModal();
    }
  };

  const handleSubmitEdit = async () => {
    if (!editingEntryId) return;

    const result = await EditProjectHistory(
      mapStepHistoryToEditHistory(newEntry, editingEntryId),
    );

    dispatch(addNotification(JSON.stringify(result.notification)));

    if (result.notification.log.status === Status.Success) {
      setHistoryList((prev) =>
        prev
          .map((h) => (h.id === editingEntryId ? result.history : h))
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          ),
      );

      closeModal();
      setEditingEntryId(null);
    }
  };

  const handleRemove = () => {
    closeModal();
  };

  return (
    <div className="mx-auto py-4 w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Historia pojazdu</h2>
          <p className="text-amp-800 text-sm">
            Chronologiczny zapis serwisów i modyfikacji
          </p>
        </div>
      </div>

      {!historyList || historyList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-amp-700/50 rounded-md">
          <BiWrench size={48} className="mb-4 opacity-80" />
          <p className="text-lg opacity-80">Brak wpisów w historii pojazdu</p>
          {isMyProject && (
            <AMPButton
              name="Dodaj pierwszy wpis"
              additionalTailwindCss="mt-5 text-sm"
              onClick={openModal}
            />
          )}
        </div>
      ) : (
        <>
          <HistoryChart history={historyList} />
          <div className="relative border-l-[1px] mt-3 border-amp-700/40 ml-4 md:ml-6">
            {historyList.map((h) => (
              <div
                key={h.id}
                className="mb-5 ml-6 md:ml-10 relative transition-colors"
              >
                {isMyProject && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <div className="pointer-events-auto">
                      <AMPMenu
                        isLoading={false}
                        items={[
                          {
                            name: "Edytuj",
                            handleClick: () => handleEdit(h),
                            icon: <BiEdit size={iconSizes.small} />,
                          },
                          {
                            name: "Usuń",
                            handleClick: () => handleDelete(h.id),
                            icon: <BiTrash size={iconSizes.small} />,
                          },
                        ]}
                      />
                    </div>
                  </div>
                )}

                <div className="absolute -left-[30px] md:-left-[45px] mt-1.5 flex items-center justify-center">
                  <div className="absolute w-7 h-7 rounded-full bg-amp-500/35 blur-md" />
                  <div className="flex items-center justify-center w-4.5 h-4.5 rounded-full border border-amp-500">
                    <div className="w-2 h-2 rounded-full bg-amp-500" />
                  </div>
                </div>

                <div className="bg-amp-900/50 dark:bg-amp-50 rounded-md p-5 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-1">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold text-white uppercase tracking-wide">
                        {h.title}
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-amp-300 dark:text-amp-800/80">
                        <span className="flex items-center gap-1.5">
                          <BiCalendar size={14} className="text-amp-500" />
                          {moment(h.date).format("D MMMM YYYY")}
                        </span>
                        <span className="flex items-center gap-1.5 text-white font-medium bg-amp-300 px-2 py-1 rounded">
                          <FaGauge size={14} className="text-amp-500" />
                          {h.mileage.toLocaleString()} km
                        </span>
                      </div>
                    </div>

                    {h.price && (
                      <div className="flex items-center gap-1.5 bg-green-500/10 text-green-500 px-3 py-1 rounded-full border border-green-500/20 text-sm font-semibold">
                        <LuCircleDollarSign size={16} />
                        {h.price.toLocaleString()} zł
                      </div>
                    )}
                  </div>

                  {h.description && (
                    <p className="text-amp-200 dark:text-amp-800/80 text-sm leading-relaxed whitespace-pre-wrap">
                      {h.description}
                    </p>
                  )}

                  {h.company && (
                    <div className="flex items-center gap-3 pt-4 border-t border-amp-700/50">
                      <div className="w-8 h-8 rounded bg-amp-700 flex items-center justify-center overflow-hidden">
                        {h.company.imagesUrl ? (
                          <img
                            src={h.company.imagesUrl}
                            alt={h.company.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <LuBuilding2 size={16} className="text-amp-400" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-amp-400 font-bold tracking-tighter">
                          Wykonano w
                        </span>
                        <span className="text-xs text-white font-semibold">
                          {h.company.name}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {isMyProject && historyList?.length > 0 && (
        <button
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-amp-500 flex items-center justify-center shadow-[0_0_20px_rgba(219,31,72,0.5)] hover:scale-105 active:scale-95 transition"
          onClick={openModal}
          aria-label="Dodaj wpis"
        >
          <BiPlus size={28} className="text-white" />
        </button>
      )}

      <AMPModal
        title="Dodaj nowy wpis"
        withHeader={true}
        onClose={closeModal}
        bgOnClickClose={false}
        visible={isModalOpen}
        additionalTailwindCss="bg-amp-50 p-2 pb-4"
      >
        <div className="p-4">
          <HistoryForm
            item={newEntry}
            index={0}
            onChange={handleFormChange}
            onRemove={handleRemove}
            onAdd={editingEntryId ? handleSubmitEdit : handleSubmitAdd}
            isLast={true}
            isSingleMode
            editMode={editingEntryId != null}
          />
        </div>
      </AMPModal>
    </div>
  );
}
