'use client';

import { usePathname } from 'next/navigation';
import MainLayoutProps from './type';
import { Suspense } from 'react';
import SkeletonLoader from '@/elements/skeleton-loader';
import dynamic from 'next/dynamic';

const NavigationMenu = dynamic(() => import('@components/layout/navigation-menu'), {
  ssr: false,
  loading: () => <SkeletonLoader />,
});

const MainLayout = ({ children }: MainLayoutProps) => {
  const pathname = usePathname();
  const isStudio = pathname.includes('studio');

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <div id="main-layout">
      <Suspense fallback={<SkeletonLoader />}>
        <NavigationMenu />
      </Suspense>
      <main className="main-layout-content">{children}</main>
    </div>
  );
};

export default MainLayout;
