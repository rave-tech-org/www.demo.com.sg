import { useContentBlocks } from '@/hooks/local/use-content-blocks';
import { useEntries } from '@/hooks/local/use-entries';
import useNavigation from '@/hooks/local/use-navigation';
import { sanityFetch } from '@/sanity/lib/live';
import { GetPage, GetPageMeta } from '@/sanity/lib/queries/cms';
import { TAG } from '@/sanity/lib/tag';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getMetadata } from '../metadata';

const getData = async (name: string) => {
  const { data } = await sanityFetch({
    query: GetPage,
    params: { name },
    tag: TAG.page,
  });
  return data;
};

type Props = { params: Promise<{ page: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: GetPageMeta,
    params: { name: (await params).page },
    tag: TAG.page,
  });

  return await getMetadata({
    title: data?.metaTitle,
    description: data?.metaDescription,
  });
}

const slugToRedirect = ['home', 'header', 'footer'];

export default async function PageByPage({ params }: Props) {
  const { page } = await params;

  if (slugToRedirect.includes(page)) redirect('/');

  const data = await getData(page);
  if (!data) notFound();

  const [entries, contentBlock, navigation] = await Promise.all([useEntries(), useContentBlocks(), useNavigation()]);

  return data?.layout?.map((block) => {
    if (!block?.slug?.current) return null;
    const Component = contentBlock.get(block.slug.current);
    return Component ? <Component key={block._id} block={block} navigation={navigation} entries={entries} /> : null;
  });
}
