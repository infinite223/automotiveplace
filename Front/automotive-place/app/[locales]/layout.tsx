import { NextIntlClientProvider, useTranslations } from "next-intl";
import { getMessages } from "next-intl/server";
import { Providers } from "../StoreProvider";
import { Notification } from "../components/logger/Notification";
import { DevLogin } from "../components/devLogin";
import { GlobalLoadingView } from "../components/loading/GlobalLoadingView";
import { ReactQueryProvider } from "./app/providers";
import { createZodErrorMap } from "../api/zodErrorMap";
import z from "zod";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smoot custom-scrollbar overflow-y">
      <body>
        <NextIntlClientProvider messages={messages}>
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
