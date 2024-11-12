'use client';

import { usePathname } from 'next/navigation';
import MainLayoutProps from './type';
import useStickyByScroll from '@/hooks/client/use-sticky-by-scroll';
import NavigationMenu from '@/components/layout/navigation-menu';
import useViewport from '@/hooks/client/use-viewport';
import MobileNavigation from '@/components/layout/mobile-navigation-menu';
import Footer from '@/components/layout/footer';

const MainLayout = ({ children }: MainLayoutProps) => {
  const pathname = usePathname();
  const isStudio = pathname.includes('studio');
  const isContentBlock = pathname.includes('content-block');

  const isSticky = useStickyByScroll(175);
  const stickyClassName = isSticky ? 'sticky main-header' : 'not-sticky main-header';
  const mainContentClassName = isSticky ? 'sticky main-layout-content' : 'main-layout-content';

  const { isTablet } = useViewport();

  if (isStudio || isContentBlock) {
    return <>{children}</>;
  }

  return (
    <div id="main-layout">
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
  );
};

export default MainLayout;
