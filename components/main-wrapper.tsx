'use client';

import { Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AppSidebar } from './app-sidebar';

function MainWrapperContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const activeCategory = searchParams.get('category') || 'faq';
  
  const showSidebar = pathname === '/resources';
  
  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('category', category);
    router.push(`${pathname}?${params.toString()}`);
  };
  
  if (showSidebar) {
    return (
      <>
        <AppSidebar 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange} 
        />
        <main className="pt-[64px] sm:pt-[88px] lg:ml-64 lg:pl-6">
          {children}
        </main>
      </>
    );
  }
  
  return (
    <main className="pt-[64px] sm:pt-[88px]">
      {children}
    </main>
  );
}

export function MainWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <main className="pt-[64px] sm:pt-[88px]">
        {children}
      </main>
    }>
      <MainWrapperContent>{children}</MainWrapperContent>
    </Suspense>
  );
}
