import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { Providers } from "../StoreProvider";
import { Notification } from "../components/logger/Notification";
import { DevLogin } from "../components/devLogin";
import { GlobalLoadingView } from "../components/loading/GlobalLoadingView";
import { ReactQueryProvider } from "./app/providers";

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locales: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locales } = await params;
  const messages = (await import(`../../i18n/locales/${locales || "en"}.json`))
    .default;

  return (
    <html lang={locales}>
      <body>
        <NextIntlClientProvider locale={locales} messages={messages}>
          <Providers>
            <ReactQueryProvider>
              <Notification />
              <GlobalLoadingView />
              <DevLogin />
              {children}
            </ReactQueryProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
