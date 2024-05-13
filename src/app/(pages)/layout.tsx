import "./globals.css";


import { Roboto } from "next/font/google";
import type { Metadata } from "next";

import { Toaster } from 'sonner'
import Provider from "@/providers";

const font = Roboto({ subsets: ["latin"], weight: ['100', '300', '500', '700'] });

export const metadata: Metadata = {
  title: "Estética",
  description: "Proyecto de estética",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={font.className}>
        <Provider>
          <Toaster richColors position="top-right"/>
          {children}
        </Provider>
      </body>
    </html>
  );
}
