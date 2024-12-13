import ReactQueryProvider from '@/elements/react-query-provider';
import { kapelka, overpass } from '@/resources/font';
import type { SearchParams } from '@/types/shared';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import MainLayout from '@components/layout/main-layout';
import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import '@/styles/global.scss';
import '@/styles/tailwind.css';

export const metadata: Metadata = {
  title: 'Demo Travel',
  description: 'Demo Travel',
};

type Props = { children: React.ReactNode };

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`${overpass.variable} ${kapelka.variable}`}>
      <body>
        <ReactQueryProvider>
          <NuqsAdapter>
            <AntdRegistry>
              <MainLayout>{children}</MainLayout>
            </AntdRegistry>
          </NuqsAdapter>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
