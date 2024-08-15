import { projectMiniData } from "@/app/utils/data/projectMiniData";
import { ProjectMiniView } from "../../app/HomeMainContent/ProjectMiniView";

export const miniViewsList = [
  {
    name: "ProjectMiniView",
    value: <ProjectMiniView data={projectMiniData} />,
    description:
      "Element ma wyświetlać najważniejsze dane odnośnie projektu, kilka lub jedno zdjęcie, najważniejsze parametry pojazdu, autora. Ma umożliwiać kilka funkcjonalności. ",
  },
];
