import NavigationMenu from '@/components/layout/navigation-menu';
import BannerCarousel from '@/components/banner-carousel';
import ContentBackground from '@/components/content-background';
import DestinationCarousel from '@/components/destination-carousel';
import HotDealsCarousel from '@/components/hot-deals-carousel';
import TravelInterestGroup from '@/components/travel-interest-group';
import FullTestimonials from '@/components/full-testimonials';
import SeeMoreArticles from '@/components/see-more-articles';

const contentBlockRegistry = new Map([
  ['home-banner', BannerCarousel],
  ['hot-deals', HotDealsCarousel],
  ['explore-destination', DestinationCarousel],
  ['travel-interest', TravelInterestGroup],
  ['navigation-menu', NavigationMenu],
  ['tour-experience', ContentBackground],
  ['full-testimonials', FullTestimonials],
  ['see-more-articles', SeeMoreArticles],
  ['social-link', NavigationMenu],
]);

export default contentBlockRegistry;
