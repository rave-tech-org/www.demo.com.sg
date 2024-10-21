import { Suspense } from 'react';
import BannerCarousel from '@/elements/banner-carousel';
import SkeletonLoader from '@/elements/skeleton-loader';
import HotDealsCarousel from '@/elements/hot-deals-carousel';
import DestinationCarousel from '@/elements/destination-carousel';
import TravelInterestGroup from '@/elements/travel-interest-group';

export default function Home() {
  return (
    <main>
      <Suspense fallback={<SkeletonLoader />}>
        <BannerCarousel />
      </Suspense>

      <Suspense fallback={<SkeletonLoader />}>
        <HotDealsCarousel />
      </Suspense>

      <Suspense fallback={<SkeletonLoader />}>
        <DestinationCarousel />
      </Suspense>

      <Suspense fallback={<SkeletonLoader />}>
        <TravelInterestGroup />
      </Suspense>
    </main>
  );
}
