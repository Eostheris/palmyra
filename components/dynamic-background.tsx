'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';

function DynamicBackgroundContent() {
  const pathname = usePathname();
  const palmyraPages = ["/", "/rules", "/penalcode", "/departments", "/lspd", "/lscso", "/ems", "/fire", "/resources", "/dojcodes"];
  const isAutoExoticPage = pathname.startsWith("/autoexotic");
  const isVanillaUnicornPage = pathname.startsWith("/vanilla-unicorn");
  const isBusinessPage = isAutoExoticPage || isVanillaUnicornPage;
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

export function DynamicBackground() {
  return (
    <Suspense fallback={null}>
      <DynamicBackgroundContent />
    </Suspense>
  );
}
