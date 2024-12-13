'use client';

import Footer from '@/components/layout/footer';
import MobileNavigation from '@/components/layout/mobile-navigation-menu';
import NavigationMenu from '@/components/layout/navigation-menu';
import useStickyByScroll from '@/hooks/client/use-sticky-by-scroll';
import useViewport from '@/hooks/client/use-viewport';
import { ConfigProvider } from 'antd';
import { usePathname } from 'next/navigation';
import type MainLayoutProps from './type';

const MainLayout = ({ children, isDraft }: MainLayoutProps) => {
  const pathname = usePathname();
  const isStudio = pathname.includes('studio');
  const isContentBlock = pathname.includes('content-block');
  const isComponentList = pathname.includes('component-list');

  const isSticky = useStickyByScroll(175);
  const stickyClassName = isSticky ? 'sticky main-header' : 'not-sticky main-header';
  const mainContentClassName = isSticky ? 'sticky main-layout-content' : 'main-layout-content';

  const { isTablet } = useViewport();

  if (isStudio || isContentBlock || isComponentList) {
    return <>{children}</>;
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FFBB0F',
        },
      }}
    >
      <div id="main-layout" className="main-layout">
        {isTablet ? (
          <div className={stickyClassName}>
            <MobileNavigation isDraft={isDraft} />
          </div>
        ) : (
          <div className={stickyClassName}>
            <NavigationMenu isDraft={isDraft} />
          </div>
        )}
        <main className={mainContentClassName}>{children}</main>
        <Footer isDraft={isDraft} />
      </div>
    </ConfigProvider>
  );
};

export default MainLayout;
