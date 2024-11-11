import type { Metadata } from 'next';
import MainLayout from '@components/layout/main-layout';
import { overpass, kapelka } from '@/resources/font';
import { AntdRegistry } from '@ant-design/nextjs-registry';

import '@/styles/global.scss';

export const metadata: Metadata = {
  title: 'Lago Travel',
  description: 'Lago Travel',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${overpass.variable} ${kapelka.variable}`}>
      <body>
        <AntdRegistry>
          <MainLayout>{children}</MainLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}
