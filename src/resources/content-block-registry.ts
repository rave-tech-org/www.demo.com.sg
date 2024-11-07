import NavigationMenu from '@/components/layout/navigation-menu';
import BannerCarousel from '@/components/banner-carousel';
import ContentBackground from '@/components/content-background';
import DestinationCarousel from '@/components/destination-carousel';
import HotDealsCarousel from '@/components/hot-deals-carousel';
import TravelInterestGroup from '@/components/travel-interest-group';
import SeeMoreArticles from '@/components/see-more-articles';
import TestimonialCarousel from '@/components/testimonial-carousel';
import { ContentBlock } from '@/sanity/sanity.types';

const contentBlockRegistry = new Map<
  string,
  ({ block }: { block: ContentBlock }) => Promise<JSX.Element> | JSX.Element
>([
  ['home-banner', BannerCarousel],
  ['hot-deals', HotDealsCarousel],
  ['explore-destination', DestinationCarousel],
  ['travel-interest', TravelInterestGroup],
  ['navigation-menu', NavigationMenu],
  ['tour-experience', ContentBackground],
  ['full-testimonials', TestimonialCarousel],
  ['see-more-articles', SeeMoreArticles],
  ['social-link', NavigationMenu],
]);

export default contentBlockRegistry;
