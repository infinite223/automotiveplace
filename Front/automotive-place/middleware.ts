import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "pl"],
  defaultLocale: "en",
});

export const config = {
  matcher: ["/", "/(pl|en)/:path*"],
};

// import { NextResponse } from "next/server";
// import { getLoggedInUser } from "@/lib/actions/user.actions"; // Z Twojej funkcji getLoggedInUser

// export default async function middleware(req) {
//   const { pathname, locale } = req.nextUrl;

//   // Wyjątki: strony, które nie wymagają zalogowania
//   const publicPaths = [`/${locale}/sign-in`, `/${locale}/sign-up`, `/${locale}/public-page`];

//   // Jeśli ścieżka jest publiczna, nie sprawdzaj logowania
//   if (publicPaths.some((path) => pathname.startsWith(path))) {
//     return NextResponse.next();
//   }

//   // Sprawdź, czy użytkownik jest zalogowany
//   const user = await getLoggedInUser();
//   if (!user) {
//     const redirectUrl = `/${locale}/sign-in`;
//     return NextResponse.redirect(new URL(redirectUrl, req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next|static|favicon.ico).*)"], // Middleware działa na wszystkich stronach z wyjątkiem API i zasobów statycznych
// };
