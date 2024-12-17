import { DisableDraftMode } from '@/components/disable-draft-mode';
import SkeletonLoader from '@/elements/skeleton-loader';
import useNavigation from '@/hooks/local/use-navigation';
import { kapelka, overpass } from '@/resources/font';
import { SanityLive } from '@/sanity/lib/live';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import MainLayout from '@components/layout/main-layout';
import { ConfigProvider } from 'antd';
import type { Metadata } from 'next';
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Fragment, Suspense } from 'react';
import '@/styles/global.scss';
import '@/styles/tailwind.css';

export const metadata: Metadata = { title: 'Demo Travel', description: 'Demo Travel' };

type Props = { children: React.ReactNode };

export default async function RootLayout({ children }: Props) {
  const navigation = await useNavigation();

  return (
    <html lang="en" className={`${overpass.variable} ${kapelka.variable}`}>
      <body>
        <NuqsAdapter>
          <AntdRegistry>
            <ConfigProvider theme={{ token: { fontFamily: 'var(--font-overpass)', colorPrimary: '#FFBB0F' } }}>
              <MainLayout navigation={navigation}>
                {children}

                <SanityLive />
                {(await draftMode()).isEnabled && (
                  <Fragment>
                    <DisableDraftMode />
                    <VisualEditing />
                  </Fragment>
                )}
              </MainLayout>
            </ConfigProvider>
          </AntdRegistry>
        </NuqsAdapter>
      </body>
    </html>
  );
}
