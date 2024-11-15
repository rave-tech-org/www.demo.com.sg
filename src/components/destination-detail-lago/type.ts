import { ModifiedProduct } from '@/components/hot-deals-carousel/type';
import { Product } from '@/sanity/sanity.types';

export type DestinationProduct = Omit<ModifiedProduct, 'tourSummary'> & {
  // tourSummary?: { isActive: boolean; imageUrl: string; title: string; description: Product['description'] }[];
};
