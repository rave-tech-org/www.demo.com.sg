import { sanityFetch } from '@/sanity/lib/live';
import { GetPageMeta } from '@/sanity/lib/queries/cms';
import { TAG } from '@/sanity/lib/tag';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { ENDPOINTS, HEADERS, getUrl } from './urls';

type Props = {
  description?: string | null;
  title?: string | null;
  imageUrl?: string | null;
  keywords?: string[] | null;
  openGraphArticle?: {
    publishedTime?: string;
    modifiedTime?: string;
    expirationTime?: string;
    authors?: null | string | URL | Array<string | URL>;
    section?: null | string;
  };
};

export const getMetadata = async ({
  title,
  description,
  imageUrl,
  openGraphArticle,
  keywords,
}: Props): Promise<Metadata> => {
  const { data: homePage } = await sanityFetch({
    query: GetPageMeta,
    tag: TAG.page,
    params: { name: 'home-page' },
  });

  const MAIN_TITLE = homePage?.metaTitle || 'Demo Travel';
  const MAIN_DESCRIPTION = description || homePage?.metaDescription || 'Demo Travel';

  const modifiedTitle = title ?? MAIN_TITLE;

  const getMetadataTitle = () => (modifiedTitle === MAIN_TITLE ? modifiedTitle : `${modifiedTitle} | ${MAIN_TITLE}`);
  const url = getUrl({ path: (await headers()).get(HEADERS.path) ?? '' });
  const images = [{ url: imageUrl ?? getUrl({ path: ENDPOINTS.ogImage }), alt: getMetadataTitle() }];
  const author = MAIN_TITLE;

  const openGraphType = openGraphArticle ? { type: 'article', ...openGraphArticle } : { type: 'website' };

  return {
    generator: author,
    applicationName: author,
    creator: author,
    publisher: author,
    referrer: 'origin-when-cross-origin',
    authors: [{ name: openGraphArticle ? openGraphArticle.authors?.toString() : MAIN_TITLE, url }],
    metadataBase: new URL(url),
    title: { default: modifiedTitle, template: `%s | ${MAIN_TITLE}` },
    description: MAIN_DESCRIPTION,
    keywords,
    openGraph: {
      title: { default: modifiedTitle, template: `%s | ${MAIN_TITLE}` },
      description: MAIN_DESCRIPTION,
      url,
      siteName: getMetadataTitle(),
      images,
      locale: 'en_US',
      tags: keywords,
      ...openGraphType,
    },
    twitter: {
      card: 'summary_large_image',
      title: { default: modifiedTitle, template: `%s | ${MAIN_TITLE}` },
      description: MAIN_DESCRIPTION,
      images,
    },
    robots: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    appleWebApp: { capable: true, title: modifiedTitle, statusBarStyle: 'default' },
  };
};