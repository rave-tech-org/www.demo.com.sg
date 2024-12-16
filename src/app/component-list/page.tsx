'use client';

import { useSanityQuery } from '@/sanity/lib/client';
import { GetContentBlocks } from '@/sanity/lib/queries/cms';
import type { GetContentBlocksResult } from '@/sanity/sanity.types';
import dynamic from 'next/dynamic';
import { parseAsBoolean, useQueryState } from 'nuqs';

const Sidebar = dynamic(() => import('./components/sidebar'), {
  ssr: false,
});

export default function ComponentListPage() {
  const [componentSlug, setComponentSlug] = useQueryState('slug', {
    defaultValue: 'home-banner',
  });

  const [isDraft, setIsDraft] = useQueryState('isDraft', parseAsBoolean.withDefault(false));

  const { data: contentBlocks } = useSanityQuery<GetContentBlocksResult>({
    query: GetContentBlocks,
    tags: ['contentBlock'],
    options: {
      queryKey: ['contentBlock'],
      staleTime: Number.POSITIVE_INFINITY,
    },
  });

  const filteredContentBlocks =
    contentBlocks
      ?.filter((block) => block.slug?.current)
      .map(({ title, slug }) => ({
        title: title ?? '',
        slug: slug?.current,
        isActive: slug?.current === componentSlug,
      }))
      .sort((a, b) => a.title.localeCompare(b.title)) || [];

  return (
    <main className="flex">
      <div className="min-h-screen w-full p-12">
        <div className="border-2 size-full flex items-center justify-center overflow-hidden">
          <iframe
            className="size-full overflow-y-scroll"
            src={`/component-list/${componentSlug}${isDraft ? '?isDraft=true' : ''}`}
            title="Component"
          />
        </div>
      </div>

      <Sidebar
        filteredContentBlocks={filteredContentBlocks}
        componentSlug={componentSlug}
        setComponentSlug={setComponentSlug}
        setIsDraft={setIsDraft}
        isDraft={isDraft}
      />
    </main>
  );
}
