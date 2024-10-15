import { Suspense } from 'react';
import BannerCarousel from '@/elements/banner-carousel';
import SkeletonLoader from '@/elements/skeleton-loader';

export default function Home() {
  return (
    <main>
      <Suspense fallback={<SkeletonLoader />}>
        <BannerCarousel />
      </Suspense>
    </main>
  );
}
