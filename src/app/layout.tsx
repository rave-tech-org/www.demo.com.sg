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
import { draftMode, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Fragment, Suspense } from 'react';
import { getMetadata } from './metadata';
import { HEADERS } from './urls';

import '@/styles/global.scss';
import '@/styles/tailwind.css';

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadata({});
}

type Props = { children: React.ReactNode };

export default async function RootLayout({ children }: Props) {
  const navigation = await useNavigation();
  const isDraft = (await headers()).get(HEADERS.isDraft);
  const callbackPath = (await headers()).get(HEADERS.path);

  if (isDraft) {
    (await draftMode()).enable();
    redirect(callbackPath ?? '/');
  }

  return (
    <html lang="en" className={`${overpass.variable} ${kapelka.variable}`}>
      <body>
        <NuqsAdapter>
          <AntdRegistry>
            <ConfigProvider theme={{ token: { fontFamily: 'var(--font-overpass)', colorPrimary: '#FFBB0F' } }}>
              <Suspense fallback={<SkeletonLoader />}>
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
              </Suspense>
            </ConfigProvider>
          </AntdRegistry>
        </NuqsAdapter>
      </body>
    </html>
  );
}
