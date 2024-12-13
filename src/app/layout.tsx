import ReactQueryProvider from '@/elements/react-query-provider';
import { kapelka, overpass } from '@/resources/font';
import type { SearchParams } from '@/types/shared';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import MainLayout from '@components/layout/main-layout';
import { ConfigProvider } from 'antd';
import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import '@/styles/global.scss';
import '@/styles/tailwind.css';

export const metadata: Metadata = {
  title: 'Demo Travel',
  description: 'Demo Travel',
};

type Props = { children: React.ReactNode; searchParams: SearchParams };

export default function RootLayout({ children, searchParams }: Props) {
  const isDraft = !!searchParams?.isDraft;

  return (
    <html lang="en" className={`${overpass.variable} ${kapelka.variable}`}>
      <body>
        <ReactQueryProvider>
          <NuqsAdapter>
            <AntdRegistry>
              <ConfigProvider
                theme={{
                  token: {
                    fontFamily: 'var(--font-overpass)',
                  },
                }}
              >
                <MainLayout isDraft={isDraft}>{children}</MainLayout>
              </ConfigProvider>
            </AntdRegistry>
          </NuqsAdapter>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
