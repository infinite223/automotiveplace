import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen bg-custom-primary text-custom-primary w-full justify-between font-inter">
      {children}
    </main>
  );
}
