
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { MainNavigation } from "@/components/main-navigation";
import { DynamicBackground } from "@/components/dynamic-background";
import { MainWrapper } from "@/components/main-wrapper";
import { AppSidebar } from "@/components/app-sidebar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Palmyra RP - FiveM Roleplay Server",
  description: "Welcome to Palmyra RP, the next evolution in FiveM roleplay. Join our mature, immersive, and fair roleplay community.",
};

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen w-full">
            <DynamicBackground />
            <MainNavigation />
            <MainWrapper>
              {children}
            </MainWrapper>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
