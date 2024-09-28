import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Providers } from "../StoreProvider";
import { Notification } from "../components/logger/Notification";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smoot custom-scrollbar overflow-y">
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Notification />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
