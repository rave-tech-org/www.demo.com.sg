import NavigationMenu from '@/components/layout/navigation-menu';
import BannerCarousel from '@/elements/banner-carousel';
import DestinationCarousel from '@/elements/destination-carousel';
import HotDealsCarousel from '@/elements/hot-deals-carousel';
import TravelInterestGroup from '@/elements/travel-interest-group';

const contentBlockRegistry = new Map([
  ['home-banner', BannerCarousel],
  ['hot-deals', HotDealsCarousel],
  ['explore-destination', DestinationCarousel],
  ['travel-interest', TravelInterestGroup],
  ['navigation-menu', NavigationMenu],
  ['social-link', NavigationMenu],
]);

export default contentBlockRegistry;
