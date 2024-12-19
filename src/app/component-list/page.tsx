'use client';

import { client } from '@/sanity/lib/client';
import { GetContentBlocks } from '@/sanity/lib/queries/cms';
import type { GetContentBlocksResult } from '@/sanity/sanity.types';
import dynamic from 'next/dynamic';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

const Sidebar = dynamic(() => import('./components/sidebar'), {
  ssr: false,
});

export default function ComponentList() {
  const [contentBlocks, setContentBlocks] = useState<GetContentBlocksResult | null>(null);

  const [componentSlug, setComponentSlug] = useQueryState('slug', {
    defaultValue: 'home-banner',
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

  useEffect(() => {
    const fetchData = async () => {
      setContentBlocks(await client.fetch<GetContentBlocksResult>(GetContentBlocks));
    };

    fetchData();
  }, []);

  return (
    <article className="flex">
      <div className="min-h-screen w-full p-12">
        <div className="border-2 size-full flex items-center justify-center overflow-hidden">
          <iframe className="size-full overflow-y-scroll" src={`/component-list/${componentSlug}`} title="Component" />
        </div>
      </div>

      <Sidebar
        filteredContentBlocks={filteredContentBlocks}
        componentSlug={componentSlug}
        setComponentSlug={setComponentSlug}
      />
    </article>
  );
}
