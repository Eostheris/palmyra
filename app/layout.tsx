
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Header } from "@/components/ui/header";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
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
  // Use Next.js navigation to get the current pathname
  // This must be inside the component function
  // Use 'usePathname' from 'next/navigation'
  // Only run on client side
  const palmyraPages = ["/", "/rules", "/penalcode", "/departments", "/lspd", "/lscso", "/ems", "/fire"];
  let pathname = "";
  if (typeof window !== "undefined") {
    pathname = window.location.pathname;
  }
  const isBusinessPage = pathname.startsWith("/autoexotic");
  const isPalmyraBg = palmyraPages.some((p) => pathname.startsWith(p));
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
            {/* Palmyra background image only on rules, penal code, departments */}
            {isPalmyraBg && !isBusinessPage && (
              <img src="/palmyrawide.png" alt="Palmyra Background" className="fixed inset-0 w-full h-full object-cover -z-10 opacity-70" />
            )}
            <Header />
            <main className={pathname === "/" ? "" : "pt-24"}>{/* Add top padding only for non-home pages */}
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
