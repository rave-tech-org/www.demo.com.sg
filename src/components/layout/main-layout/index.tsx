import Image from 'next/image';
import MainLayoutProps from './type';
import { overpass } from '@/resources/font';
import NavigationMenu from '@components/layout/navigation-menu';
// import NavigationMenu from '@/components/navigation-menu';
// import overPass from '@/resources/font'
// import useViewport from '@/hooks/client/useViewport'
// import useStickyByScroll from '@/hooks/client/useStickyByScroll'

const MainLayout = ({ children }: MainLayoutProps) => {
  // const pathname = usePathname()

  // const isMobile = useViewport()
  // const isSticky = useStickyByScroll(50)

  return (
    <div id="main-layout" className={overpass.className}>
      {/* <div
        id="navigation-header"
      >
      </div>
      <div className="mobile-navigation">
      </div> */}
      <NavigationMenu />
      <main className="main-layout-content">{children}</main>
    </div>
  );
};

export default MainLayout;
