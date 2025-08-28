
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Palmyra RP - FiveM Roleplay Server",
  description: "Welcome to Palmyra RP, the next evolution in FiveM roleplay. Join our mature, immersive, and fair roleplay community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: 'black', color: 'white', fontFamily: 'Arial, sans-serif', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  );
}
