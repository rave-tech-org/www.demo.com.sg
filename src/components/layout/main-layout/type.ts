import type { Navigation } from '@/hooks/local/use-navigation';
import type { ContentBlock, Page } from '@/sanity/sanity.types';
import type { ReactNode } from 'react';

type MainLayoutProps = {
  children: ReactNode;
  navigation: Navigation;
};

export type PageType = Omit<Page, 'layout'> & { layout: ContentBlock[] } & { imageUrl: string };

export default MainLayoutProps;
