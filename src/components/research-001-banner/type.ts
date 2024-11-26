import type { Entries } from '@/resources/content-block-registry';
import type { GetContentBlockResult } from '@/sanity/sanity.types';

export interface ResearchZeroZeroOneBannerProps<B = GetContentBlockResult, E = Entries> {
  block: B;
  entries: E;
}

export type ResearchZeroZeroOneBannerCustomAttributesProps = {
  'cta-text': string;
};
