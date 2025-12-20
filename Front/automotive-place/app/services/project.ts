import {
  TBasicPopularProject,
  TBasicProject,
  TProject,
  TProjectCreate,
} from "../utils/types/project";
import { apiEndpoints } from "./api.endpoints";

export const createProject = async (
  project: TProjectCreate,
  locale: string = "en"
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

export const deleteProject = async (
  projectId: string,
  locale: string = "en"
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

export const getProjects = async () => {
  const response = await fetch(apiEndpoints.getProjects, {
    next: { revalidate: 60 },
  });
  if (!response.ok) {
    throw new Error("Failed to get data");
  }

  const result: TBasicProject[] = await response.json();
  console.log(result, "result getProjects");
  return result;
};
