import "./globals.css";

import type { Metadata } from "next";

import { ThemeProvider } from "@/components/shared/theme-provider";

import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "GestiónPro",
    template: "%s | GestiónPro",
  },

  description:
    "Sistema moderno de gestión empresarial",

  keywords: [
    "dashboard",
    "crm",
    "gestion",
    "saas",
    "nextjs",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          {children}

          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}