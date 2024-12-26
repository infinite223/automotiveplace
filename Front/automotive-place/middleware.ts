import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { LRUCache } from "lru-cache";
import { logger } from "./app/api/logger.config";

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

const rateLimitCache = new LRUCache<
  string,
  { count: number; lastRequestTime: number }
>({
  max: 500,
  ttl: 60 * 1000,
});

function getClientIp(request: NextRequest): string | null {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const ips = xForwardedFor.split(",");
    return ips[0].trim();
  }
  return request.headers.get("x-real-ip") || request.ip || null;
}

function rateLimit(request: NextRequest): boolean {
  const ip = getClientIp(request);

  if (!ip) {
    return false;
  }

  const currentTime = Date.now();
  const requestCount = rateLimitCache.get(ip) || {
    count: 0,
    lastRequestTime: currentTime,
  };

  if (currentTime - requestCount.lastRequestTime < 60 * 1000) {
    requestCount.count += 1;
  } else {
    requestCount.count = 1;
    requestCount.lastRequestTime = currentTime;
  }

  rateLimitCache.set(ip, requestCount);
  if (requestCount.count > 100) {
    logger.error(`Rate limit (100) exceeded for IP: ${ip}`);

    return false;
  }

  if (requestCount.count > 50) {
    logger.error(`Rate limit (50) exceeded for IP: ${ip}`);

    return false;
  }

  return true;
}

export default async function middleware(request: NextRequest) {
  const [, locale, ...segments] = request.nextUrl.pathname.split("/");
  const pathname = request.nextUrl.pathname;

  if (!publicPaths.some((path) => pathname.startsWith(`/${locale}${path}`))) {
    const user = await getLoggedInUser();

    if (!user) {
      request.nextUrl.pathname = `/${locale}/sign-in`;
    }
  }

  if (!rateLimit(request) && !request.url.includes("localhost")) {
    console.log("Too many requests, please try again later.");
    return NextResponse.json(
      { message: "Too many requests, please try again later." },
      { status: 429 }
    );
  }

  const handleI18nRouting = createMiddleware({
    locales: ["en", "pl"],
    defaultLocale: "en",
  });
  const response = handleI18nRouting(request);
  return response;
}
