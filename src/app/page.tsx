import { useContentBlocks } from '@/hooks/local/use-content-blocks';
import { useEntries } from '@/hooks/local/use-entries';
import { sanityFetch } from '@/sanity/lib/live';
import { GetPage } from '@/sanity/lib/queries/cms';
import { TAG } from '@/sanity/lib/tag';

export default async function Home() {
  const [entries, contentBlock] = await Promise.all([useEntries(), useContentBlocks()]);
  const { data: homePage } = await sanityFetch({ query: GetPage, params: { name: 'home-page' }, tag: TAG.page });

  return homePage?.layout?.map((block, index) => {
    const Component = contentBlock.get(block.slug?.current || '');
    return Component ? <Component key={`home-page-${index}`} block={block} entries={entries} /> : null;
  });
}
