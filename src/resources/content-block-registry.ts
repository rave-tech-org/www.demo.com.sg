import BannerCarousel from '@/components/banner-carousel';
import ContentBackground from '@/components/content-background';
import DestinationCarousel from '@/components/destination-carousel';
import HotDealsCarousel from '@/components/hot-deals-carousel';
import NavigationMenu from '@/components/layout/navigation-menu';
import ResearchZeroZeroOneBanner from '@/components/research-001-banner';
import SeeMoreArticles from '@/components/see-more-articles';
import TestimonialCarousel from '@/components/testimonial-carousel';
import TourSearchResult from '@/components/tour-search-result';
import TravelInterestGroup from '@/components/travel-interest-group';
import type {
  GetCategoriesResult,
  GetContentBlockResult,
  GetPostsResult,
  GetProductsResult,
  GetTestimonialsResult,
} from '@/sanity/sanity.types';

export type Entries = {
  categories: GetCategoriesResult;
  products: GetProductsResult;
  testimonials: GetTestimonialsResult;
  posts: GetPostsResult;
};

const contentBlockRegistry = new Map<
  string,
  ({ block }: { block: GetContentBlockResult; entries: Entries }) => Promise<JSX.Element> | JSX.Element
>([
  ['home-banner', BannerCarousel],
  ['hot-deals', HotDealsCarousel],
  ['explore-destination', DestinationCarousel],
  ['travel-interest', TravelInterestGroup],
  ['navigation-menu', NavigationMenu],
  ['tour-experience', ContentBackground],
  ['tour-search-banner', ContentBackground],
  ['full-testimonials', TestimonialCarousel],
  ['see-more-articles', SeeMoreArticles],
  ['social-link', NavigationMenu],
  ['tour-search-and-result', TourSearchResult],
  ['research-001-banner', ResearchZeroZeroOneBanner],
]);

export default contentBlockRegistry;
