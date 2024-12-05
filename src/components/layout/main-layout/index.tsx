'use client';

import { usePathname } from 'next/navigation';
import MainLayoutProps from './type';
import useStickyByScroll from '@/hooks/client/use-sticky-by-scroll';
import NavigationMenu from '@/components/layout/navigation-menu';
import useViewport from '@/hooks/client/use-viewport';
import MobileNavigation from '@/components/layout/mobile-navigation-menu';
import Footer from '@/components/layout/footer';
import { ConfigProvider } from 'antd';

const MainLayout = ({ children }: MainLayoutProps) => {
  const pathname = usePathname();
  const isStudio = pathname.includes('studio');
  const isContentBlock = pathname.includes('content-block');
  const isComponentList = pathname.includes('component-list');
  const isPreview = pathname.includes('preview');

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
            <MobileNavigation isDraft={isPreview} />
          </div>
        ) : (
          <div className={stickyClassName}>
            <NavigationMenu isDraft={isPreview} />
          </div>
        )}
        <main className={mainContentClassName}>{children}</main>
        <Footer isDraft={isPreview} />
      </div>
    </ConfigProvider>
  );
};

export default MainLayout;
