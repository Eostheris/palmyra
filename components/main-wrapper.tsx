'use client';

import { usePathname } from 'next/navigation';

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <main className={pathname === "/" ? "" : "pt-24"}>
      {children}
    </main>
  );
}
