import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Certified Certification",
  description: "CertifiedCertification",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${plusJakarta.variable}  antialiased`}>
        <Toaster
          position="top-right"
          className="toaster"
          toastOptions={{
            style: {
              borderWidth: "1px",
              borderColor: "black",
              borderBottomWidth: "4px",
              borderBottomStyle: "solid",
            },
            duration: 3000,
          }}
        />
        {children}
      </body>
    </html>
  );
}
