'use client';

import ProductCarouselCard from '@/components/product-carousel-card';
import SkeletonLoader from '@/elements/skeleton-loader';
import type { GetProductsByCategoryResult } from '@/sanity/sanity.types';
import ViewIn from '@elements/view-in';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperOptions } from 'swiper/types';

const productCarouselSwiperSetting: SwiperOptions = {
  modules: [Pagination],
  pagination: {
    clickable: true,
  },
  centeredSlides: false,
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
  },
  spaceBetween: 30,
};

interface ProductCarouseInterface {
  title: string;
  products: GetProductsByCategoryResult;
}

const ProductCarousel = ({ title = 'Explore Our Tour Packages', products }: ProductCarouseInterface) => {
  if (!products) {
    return <SkeletonLoader />;
  }

  return (
    <ViewIn variant="slideUp" delay={200}>
      <div className="demo-product-carousel-wrapper">
        <div className="wrapper">
          <h5>{title}</h5>
          <Swiper {...productCarouselSwiperSetting}>
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                <ProductCarouselCard {...product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </ViewIn>
  );
};

export default ProductCarousel;
