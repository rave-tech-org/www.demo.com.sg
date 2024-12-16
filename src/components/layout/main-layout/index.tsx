'use client';

import Footer from '@/components/layout/footer';
import MobileNavigation from '@/components/layout/mobile-navigation-menu';
import NavigationMenu from '@/components/layout/navigation-menu';
import SkeletonLoader from '@/elements/skeleton-loader';
import useStickyByScroll from '@/hooks/client/use-sticky-by-scroll';
import useViewport from '@/hooks/client/use-viewport';
import { ConfigProvider } from 'antd';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import type MainLayoutProps from './type';

const MainLayout = ({ children }: MainLayoutProps) => {
  const isDraft = !!useSearchParams().get('isDraft');
  const pathname = usePathname();

  const isStudio = pathname.includes('studio');

  const isComponentList = pathname.includes('component-list');

  const isSticky = useStickyByScroll(175);
  const stickyClassName = isSticky ? 'sticky main-header' : 'not-sticky main-header';
  const mainContentClassName = isSticky ? 'sticky main-layout-content' : 'main-layout-content';

  const { isTablet } = useViewport();

  if (isStudio || isComponentList) return children;

  return (
    <ConfigProvider
      theme={{
        token: { fontFamily: 'var(--font-overpass)', colorPrimary: '#FFBB0F' },
      }}
    >
      <Suspense fallback={<SkeletonLoader />}>
        <div id="main-layout" className="main-layout">
          {!isComponentList && !isStudio && isDraft ? (
            <div className="fixed left-0 top-0 px-2 pt-1 bg-primary text-black uppercase font-bold text-xl z-[9999]">
              DRAFT MODE
            </div>
          ) : null}
          {isTablet ? (
            <div className={stickyClassName}>
              <MobileNavigation />
            </div>
          ) : (
            <div className={stickyClassName}>
              <NavigationMenu />
            </div>
          )}
          <main className={mainContentClassName}>{children}</main>
          <Footer />
        </div>
      </Suspense>
    </ConfigProvider>
  );
};

export default MainLayout;
