import { Suspense } from 'react';
import BannerCarousel from '@/elements/banner-carousel';
import SkeletonLoader from '@/elements/skeleton-loader';
import HotDealsCarousel from '@/elements/hot-deals-carousel';

export default function Home() {
  return (
    <main>
      <Suspense fallback={<SkeletonLoader />}>
        <BannerCarousel />
      </Suspense>

      <Suspense fallback={<SkeletonLoader />}>
        <HotDealsCarousel />
      </Suspense>
    </main>
  );
}
