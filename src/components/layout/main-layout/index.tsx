'use client';

import MainLayoutProps from './type';
import { overpass } from '@/resources/font';
import NavigationMenu from '@components/layout/navigation-menu';

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div id="main-layout" className={overpass.className}>
      <NavigationMenu />
      <main className="main-layout-content">{children}</main>
    </div>
  );
};

export default MainLayout;
