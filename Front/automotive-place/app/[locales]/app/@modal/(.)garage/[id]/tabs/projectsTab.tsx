import { ProjectMiniView } from "@/app/[locales]/app/HomeMainContent/ProjectMiniView";
import { AMPButton } from "@/app/components/shared/AMPButton";
import { TGarage } from "@/app/utils/types/garage";
import { TBasicProject } from "@/app/utils/types/project";
import { useQueryClient } from "@tanstack/react-query";
import { LuCar } from "react-icons/lu";
import { QUERY_KEY_GARAGE } from "../page";

export const ProjectsTab = ({
  projects,
  isUserContent,
}: {
  projects: TBasicProject[];
  isUserContent: boolean;
}) => {
  const queryClient = useQueryClient();

  const onDelete = (id: string) => {
    queryClient.setQueryData<TGarage>(
      [QUERY_KEY_GARAGE, projects[0].author.id],
      (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          projects: oldData.projects.filter((p) => p.id !== id),
        };
      },
    );

    queryClient.setQueryData(["projects"], (oldData: any) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        pages: oldData.pages.map((page: any) => ({
          ...page,
          data: page.data.filter((item: any) => item.data.id !== id),
        })),
      };
    });
  };

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 m-3 border-amp-700 rounded-md bg-amp-50">
        <LuCar className="w-12 h-12 mb-4 opacity-20" />
        <p className="text-lg font-medium text-center px-4">
          Twój garaż jest jeszcze pusty
        </p>
        <p className="text-sm opacity-60 mb-6 text-center">
          Dodaj swój pierwszy projekt, aby inni mogli go podziwiać
        </p>
        {isUserContent && <AMPButton name="Dodaj projekt" type="primary" />}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {projects.map((project) => (
        <ProjectMiniView
          key={project.id}
          data={project}
          isUserContent={isUserContent}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
