import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function NotFound() {
  const user = await getLoggedInUser();
  const locale = await getLocale();

  if (user) return redirect(`/${locale}/app`);

  return redirect("/");
}
