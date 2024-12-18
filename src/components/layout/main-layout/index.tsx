'use client';

import Footer from '@/components/layout/footer';
import MobileNavigation from '@/components/layout/mobile-navigation-menu';
import NavigationMenu from '@/components/layout/navigation-menu';
import useStickyByScroll from '@/hooks/client/use-sticky-by-scroll';
import useViewport from '@/hooks/client/use-viewport';
import { usePathname } from 'next/navigation';
import type MainLayoutProps from './type';

const MainLayout = ({ children, navigation }: MainLayoutProps) => {
  const pathname = usePathname();

  const isStudio = pathname.includes('studio');
  const isComponentList = pathname.includes('component-list');

  const isSticky = useStickyByScroll(175);
  const stickyClassName = isSticky ? 'sticky main-header' : 'not-sticky main-header';
  const mainContentClassName = isSticky ? 'sticky main-layout-content' : 'main-layout-content';

  const { isTablet } = useViewport();

  if (isStudio || isComponentList) return children;

  return (
    <div id="main-layout" className="main-layout">
      <div className={stickyClassName}>
        {isTablet ? <MobileNavigation navigation={navigation} /> : <NavigationMenu navigation={navigation} />}
      </div>
      <main className={mainContentClassName}>{children}</main>
      <Footer navigation={navigation} />
    </div>
  );
};

export default MainLayout;
