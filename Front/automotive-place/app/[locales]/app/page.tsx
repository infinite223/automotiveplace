import { contentData } from "@/app/utils/data/contentData";
import { HomeMainContent } from "./HomeMainContent";

export default async function Page() {
  return (
    <div className="flex w-full items-center justify-center">
      <HomeMainContent contentData={contentData} />
    </div>
  );
}
