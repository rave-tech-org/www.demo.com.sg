'use client';

import MainLayoutProps from './type';
import NavigationMenu from '@components/layout/navigation-menu';

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div id="main-layout">
      <NavigationMenu />
      <main className="main-layout-content">{children}</main>
    </div>
  );
};

export default MainLayout;
