const base = "/api";

export const apiEndpoints = {
  createCarItem: `${base}/carItem/add-carItem`,
  getMainContentDataForUser: `${base}/content/main/contentdata`,
  createData: `${base}/data/create-data`,
  loginDev: `${base}/dev/login`,
  createLike: `${base}/like/create`,
  deleteLike: `${base}/like/delete`,
  createProject: `${base}/project/add-project`,
  getProjects: `${base}/project/get-project`,
  createStage: `${base}/project/add-stage`,
};
