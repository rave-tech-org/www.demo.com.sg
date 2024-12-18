import { useContentBlocks } from '@/hooks/local/use-content-blocks';
import { useEntries } from '@/hooks/local/use-entries';
import useNavigation from '@/hooks/local/use-navigation';
import { sanityFetch } from '@/sanity/lib/live';
import { GetContentBlockBySlug } from '@/sanity/lib/queries/cms';
import { TAG } from '@/sanity/lib/tag';

export default async function ComponentList({ params }: { params: Promise<{ slug: string }> }) {
  const [entries, contentBlock, navigation] = await Promise.all([useEntries(), useContentBlocks(), useNavigation()]);

  const { slug } = await params;

  const { data: block } = await sanityFetch({
    query: GetContentBlockBySlug,
    params: { slug: slug || 'home-banner' },
    tag: TAG.contentBlock,
  });

  const Component = contentBlock.get(block?.slug?.current || '');

  return (
    <article className="block-wrapper">
      {Component ? <Component entries={entries} navigation={navigation} block={block} /> : null}
    </article>
  );
}
