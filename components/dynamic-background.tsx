'use client';

import { usePathname } from 'next/navigation';

export function DynamicBackground() {
  const pathname = usePathname();
  const palmyraPages = ["/", "/rules", "/penalcode", "/departments", "/lspd", "/lscso", "/ems", "/fire", "/resources", "/dojcodes"];
  const isBusinessPage = pathname.startsWith("/autoexotic");
  const isPalmyraBg = palmyraPages.some((p) => pathname.startsWith(p));

  if (isPalmyraBg && !isBusinessPage) {
    return (
      <div 
        className="fixed inset-0 w-full h-full -z-10 opacity-70"
        style={{ 
          backgroundImage: 'url(/palmyrawide.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />
    );
  }

  return null;
}
