import { Entries } from '@/hooks/local/use-entries';
import type { GetContentBlockResult } from '@/sanity/sanity.types';

export interface ResearchZeroZeroTwoBannerProps<B = GetContentBlockResult, E = Entries> {
  block: B;
  entries: E;
}

export type ResearchZeroZeroTwoBannerCustomAttributesProps = {
  'cta-text': string;
};
