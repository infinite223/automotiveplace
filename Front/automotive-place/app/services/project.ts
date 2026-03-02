import { MainContentResponse } from "../hooks/useMainContent";
import { ContentType } from "../utils/enums";
import { THistoryCreate, THistoryEdit } from "../utils/types/history";
import {
  TBasicPopularProject,
  TBasicProject,
  TProject,
  TProjectCreate,
} from "../utils/types/project";
import { TVisualModificationCreate } from "../utils/types/visualModification";
import { apiEndpoints } from "./api.endpoints";
import { PAGE_SIZE } from "./consts";

export const createProject = async (
  project: TProjectCreate,
  locale: string = "en",
) => {
  const response = await fetch(apiEndpoints.createProject, {
    method: "POST",
    body: JSON.stringify(project),
    headers: { "Content-Type": "application/json", "Accept-Language": locale },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message =
      errorData?.message || `Failed to add project (${response.status})`;

    throw new Error(message);
  }

  const result = await response.json();
  return result;
};

export const uploadImageProject = async (
  projectId: string,
  formData: FormData,
  stageNumber?: number,
  visualModificationId?: string,
) => {
  if (stageNumber !== undefined) {
    formData.append("stageNumber", String(stageNumber));
  }

  if (visualModificationId) {
    formData.append("visualModificationId", visualModificationId);
  }

  const response = await fetch(`/api/upload-images/${projectId}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message =
      errorData?.message || `Failed upload images (${response.status})`;
    throw new Error(message);
  }

  const result = await response.json();
  return result;
};

export const deleteProject = async (
  projectId: string,
  locale: string = "en",
) => {
  const response = await fetch(`${apiEndpoints.deleteProject}/${projectId}`, {
    method: "DELETE",
    headers: { "Accept-Language": locale },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message =
      errorData?.message ||
      `Failed to delete project (status: ${response.status})`;

    throw new Error(message);
  }

  const result = await response.json();
  return result;
};

export const getProject = async (id: string) => {
  const response = await fetch(`${apiEndpoints.getProject}?id=${id}`, {
    next: { revalidate: 60 },
  });
  if (!response.ok) {
    throw new Error("Failed to get project");
  }

  const result: TProject = await response.json();
  console.log(result, "result getProject");
  return result;
};

export const getPopularProjects = async () => {
  const response = await fetch(apiEndpoints.getPopularProjects, {
    next: { revalidate: 60 },
  });
  if (!response.ok) {
    throw new Error("Failed to get data");
  }

  const result: TBasicPopularProject[] = await response.json();
  console.log(result, "result getPopularProjects");
  return result;
};

export const getProjectsInfinite = async (
  page: number,
): Promise<MainContentResponse> => {
  const response = await fetch(
    `${apiEndpoints.getProjects}?page=${page}&limit=${PAGE_SIZE}`,
    { next: { revalidate: 60 } },
  );

  if (!response.ok) {
    throw new Error("Failed to get projects");
  }

  const result: {
    data: TBasicProject[];
    hasMore: boolean;
    page: number;
    itemsCount: number;
  } = await response.json();

  console.log(result.data, "result getProjectsInfinite");

  return {
    data: result.data.map((project) => ({
      data: project,
      type: ContentType.Project,
    })),
    itemsCount: result.itemsCount,
    hasMore: result.hasMore,
  };
};

export const CreateProjectHistory = async (history: THistoryCreate) => {
  const response = await fetch(`${apiEndpoints.createProjectHistory}`, {
    method: "POST",
    body: JSON.stringify(history),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.message || `Failed to add history`);
  }

  return await response.json();
};

export const CreateVisualModification = async (
  mod: TVisualModificationCreate & { projectId: string },
) => {
  const response = await fetch(`${apiEndpoints.createVisualModification}`, {
    method: "POST",
    body: JSON.stringify({
      name: mod.name,
      description: mod.description,
      modificationType: mod.modificationType,
      projectId: mod.projectId,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.message || `Failed to add visual mod`);
  }

  return await response.json();
};

export const EditVisualModification = async (
  mod: TVisualModificationCreate & { id: string },
) => {
  const response = await fetch(`${apiEndpoints.editVisualModification}`, {
    method: "POST",
    body: JSON.stringify({
      id: mod.id,
      name: mod.name,
      description: mod.description,
      modificationType: mod.modificationType,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.message || `Failed to edit visual mod`);
  }

  return await response.json();
};

export const RemoveVisualModification = async (id: string) => {
  const response = await fetch(
    `${apiEndpoints.removeVisualModification}/${id}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData?.message || `Failed to remove visual mod (${response.status})`,
    );
  }

  const result = await response.json();
  return result;
};

export const EditProjectHistory = async (history: THistoryEdit) => {
  const response = await fetch(`${apiEndpoints.editProjectHistory}`, {
    method: "POST",
    body: JSON.stringify(history),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message =
      errorData?.message || `Failed to edit history (${response.status})`;

    throw new Error(message);
  }

  const result = await response.json();
  return result;
};

export const RemoveProjectHistory = async (id: string) => {
  const response = await fetch(`${apiEndpoints.removeProjectHistory}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message =
      errorData?.message || `Failed to remove history (${response.status})`;

    throw new Error(message);
  }

  const result = await response.json();
  return result;
};
