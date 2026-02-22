const base = "/api";

export const apiEndpoints = {
  createCarItem: `${base}/carItem/add-carItem`,

  getMainContentDataForUser: `${base}/content/main/contentdata`,
  createData: `${base}/data/create-data`,

  loginDev: `${base}/dev/login`,

  createLike: `${base}/like/create`,
  deleteLike: `${base}/like/delete`,

  createProject: `${base}/project/add-project`,
  deleteProject: `${base}/project/delete-project`,
  createProjectHistory: `${base}/project/add-project-history`,
  editProjectHistory: `${base}/project/edit-project-history`,
  removeProjectHistory: `${base}/project/remove-project-history`,
  getProject: `${base}/project/get-project`,
  getProjects: `${base}/project/get-projects`,
  getPopularProjects: `${base}/project/get-popular-projects`,
  createStage: `${base}/project/add-stage`,

  deletePost: `${base}/post/delete-post`,
  getPosts: `${base}/post/get-posts`,

  getGarage: `${base}/garage/get-garage`,
};
