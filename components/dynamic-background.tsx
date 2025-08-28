'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';

export function DynamicBackground() {
  const pathname = usePathname();
  const palmyraPages = ["/", "/rules", "/penalcode", "/departments", "/lspd", "/lscso", "/ems", "/fire"];
  const isBusinessPage = pathname.startsWith("/autoexotic");
  const isPalmyraBg = palmyraPages.some((p) => pathname.startsWith(p));

  if (isPalmyraBg && !isBusinessPage) {
    return (
      <Image 
        src="/palmyrawide.png" 
        alt="Palmyra Background" 
        fill
        className="object-cover -z-10 opacity-70"
        priority
      />
    );
  }

  return null;
}
