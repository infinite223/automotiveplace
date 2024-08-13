import { HomeMainContent } from "./HomeMainContent";
import { contentData } from "../utils/data/contentData";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getLoggedInUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="flex w-full items-center justify-center">
      <HomeMainContent contentData={contentData} />
    </div>
  );
}
