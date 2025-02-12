// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/AuthProvider";
import StoreProvider from "@/StoreProvider";
import { ContextProvider } from "@/lib/features/PaymentContext";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";

export const metadata: Metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps} suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <AuthProvider>
          <MantineProvider defaultColorScheme="dark">
            <Notifications />
            <StoreProvider>
              <ContextProvider>{children}</ContextProvider>
            </StoreProvider>
          </MantineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
