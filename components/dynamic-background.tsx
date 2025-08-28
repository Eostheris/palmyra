'use client';

import { usePathname } from 'next/navigation';

export function DynamicBackground() {
  const pathname = usePathname();
  const palmyraPages = ["/", "/rules", "/penalcode", "/departments", "/lspd", "/lscso", "/ems", "/fire"];
  const isBusinessPage = pathname.startsWith("/autoexotic");
  const isPalmyraBg = palmyraPages.some((p) => pathname.startsWith(p));

  if (isPalmyraBg && !isBusinessPage) {
    return (
      <img 
        src="/palmyrawide.png" 
        alt="Palmyra Background" 
        className="fixed inset-0 w-full h-full object-cover -z-10 opacity-70" 
      />
    );
  }

  return null;
}
