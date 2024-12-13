'use client';

import { cn } from '@/lib/utils';
import { CloseOutlined, HomeOutlined, MenuOutlined } from '@ant-design/icons';
import { useLocalStorage } from '@uidotdev/usehooks';
import { Select, Switch } from 'antd';
import Link from 'next/link';
import type { Options } from 'nuqs';
import { Fragment } from 'react';

type Props = {
  filteredContentBlocks: {
    title: string;
    slug: string | undefined;
    isActive: boolean;
  }[];
  setComponentSlug: (
    value: string | ((old: string) => string | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
  setIsDraft: (
    value: boolean | ((old: boolean) => boolean | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
  componentSlug: string;
  isDraft: boolean;
};

export default function Sidebar({
  setComponentSlug,
  setIsDraft,
  isDraft,
  filteredContentBlocks,
  componentSlug,
}: Props) {
  const [recentlySlugs, setRecentlySlugs] = useLocalStorage<string[]>('recent-slugs', ['home-banner']);

  const [menuStyle, setMenuStyle] = useLocalStorage('menu-style', {
    open: true,
  });

  return (
    <Fragment>
      <aside
        className={cn('sticky top-0 h-screen z-50 bg-primary text-black animate w-[20%]', {
          '!w-0 translate-x-full invisible': !menuStyle.open,
          'p-6': menuStyle.open,
        })}
      >
        <h1>Draft Mode</h1>
        <Switch defaultChecked={isDraft} onChange={(e) => setIsDraft(e)} />

        <h1 className="mt-4">Select components</h1>
        <Select
          value={componentSlug}
          showSearch
          filterOption={(input, option) => (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())}
          onChange={(e) => {
            setComponentSlug(e);

            const temp = structuredClone(recentlySlugs);
            const index = temp.indexOf(e);
            if (index !== -1) temp.splice(index, 1);

            temp.unshift(e);

            if (temp.length > 10) temp.pop();

            setRecentlySlugs(temp);
          }}
          className="w-full"
        >
          {filteredContentBlocks.map((e) => {
            return (
              <Select.Option value={e.slug} key={e.slug}>
                {`${e.title}, ${e.slug}`}
              </Select.Option>
            );
          })}
        </Select>

        <h1 className="mt-4">Recent viewed components</h1>
        <nav className="flex flex-wrap gap-2 items-center">
          {recentlySlugs.map((e) => {
            const isActive = e === componentSlug;

            return (
              <button
                className={cn('px-4 pt-1 pb-0.5 bg-white text-black animate', { 'bg-white/70': !isActive })}
                key={e}
                type="button"
                onClick={() => {
                  setComponentSlug(e);

                  const temp = structuredClone(recentlySlugs);
                  const index = temp.indexOf(e);
                  if (index !== -1) temp.splice(index, 1);
                  temp.unshift(e);
                  setRecentlySlugs(temp);
                }}
              >
                {e}
              </button>
            );
          })}
        </nav>
      </aside>

      <section className="fixed centered-bottom mb-24 bg-primary p-2 rounded-md flex gap-2">
        <Link className="pt-2 pb-1 bg-white text-black px-4 rounded-md" target="_blank" href="/">
          <HomeOutlined width={30} />
        </Link>
        <Link
          className="pt-2 pb-1 bg-white text-black px-4 rounded-md"
          target="_blank"
          href={`/component-list/${componentSlug}`}
        >
          View Component
        </Link>

        <button
          className="pt-2 pb-1 bg-white text-black px-4 rounded-md"
          type="button"
          onClick={() => setMenuStyle((e) => ({ ...e, open: !e.open }))}
        >
          {menuStyle.open ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </section>
    </Fragment>
  );
}
