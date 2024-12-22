import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/actions/user.actions";

// export default createMiddleware({
//   locales: ["en", "pl"],
//   defaultLocale: "en",
// });

export const config = {
  matcher: ["/", "/(pl|en)/:path*"],
};

const publicPaths = [
  "/sign-in",
  "/sign-up",
  "/public-page",
  "/",
  "/preview",
  "",
];

export default async function middleware(request: NextRequest) {
  const [, locale, ...segments] = request.nextUrl.pathname.split("/");
  const pathname = request.nextUrl.pathname;

  if (!publicPaths.some((path) => pathname.startsWith(`/${locale}${path}`))) {
    const user = await getLoggedInUser();

    if (!user) {
      request.nextUrl.pathname = `/${locale}/sign-in`;
    }
  }

  const handleI18nRouting = createMiddleware({
    locales: ["en", "pl"],
    defaultLocale: "en",
  });
  const response = handleI18nRouting(request);
  return response;
}
