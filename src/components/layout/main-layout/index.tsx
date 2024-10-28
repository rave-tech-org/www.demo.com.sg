'use client';

import { usePathname } from 'next/navigation';
import MainLayoutProps from './type';
import NavigationMenu from '@components/layout/navigation-menu';

const MainLayout = ({ children }: MainLayoutProps) => {
  const pathname = usePathname();
  const isStudio = pathname.includes('studio');

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <div id="main-layout">
      <NavigationMenu />
      <main className="main-layout-content">{children}</main>
    </div>
  );
};

export default MainLayout;
