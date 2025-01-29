import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { LRUCache } from "lru-cache";
import { logger } from "./app/api/logger.config";
import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";

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

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["ip.src"], // Track requests by IP
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),
    // Create a bot detection rule
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services
        //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      ],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
      mode: "LIVE",
      refillRate: 20, // Refill 5 tokens per interval
      interval: 10, // Refill every 10 seconds
      capacity: 40, // Bucket capacity of 10 tokens
    }),
  ],
});

export default async function middleware(request: NextRequest) {
  const [, locale, ...segments] = request.nextUrl.pathname.split("/");
  const pathname = request.nextUrl.pathname;

  const decision = await aj.protect(request, { requested: 5 });

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      logger.error("Rate limit exceeded");

      return NextResponse.json(
        { error: "Too Many Requests", reason: decision.reason },
        { status: 429 }
      );
    } else if (decision.reason.isBot()) {
      return NextResponse.json(
        { error: "No bots allowed", reason: decision.reason },
        { status: 403 }
      );
    } else {
      return NextResponse.json(
        { error: "Forbidden", reason: decision.reason },
        { status: 403 }
      );
    }
  }

  if (!publicPaths.some((path) => pathname.startsWith(`/${locale}${path}`))) {
    const user = await getLoggedInUser();

    if (!user) {
      request.nextUrl.pathname = `/${locale}/sign-in`;
    }
  }

  if (!rateLimit(request) && !request.url.includes("localhost")) {
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
