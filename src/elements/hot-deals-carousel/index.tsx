'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';

import HotDealsCard from '@elements/hot-deals-card';
import { Pagination } from 'swiper/modules';
import { sanityFetch } from '@/sanity/lib/client';
import { GET_PRODUCTS_BY_PARENT_CATEGORIES } from '@/sanity/lib/queries/cms';
import SkeletonLoader from '../skeleton-loader';
import { HotDealsBlock, ModifiedProduct } from './type';

const hotDealsSwiperSetting: SwiperOptions = {
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

const HotDealsCarousel = ({ block }: { block: HotDealsBlock }) => {
  const categorySlugs = block.categories?.map((category) => category.slug.current) || ['hot-deals'];
  const [products, setProducts] = useState<ModifiedProduct[] | null>(null);

  useEffect(() => {
    (async () => {
      const products = await sanityFetch<ModifiedProduct[]>({
        query: GET_PRODUCTS_BY_PARENT_CATEGORIES(categorySlugs),
        tags: [`page.products.${categorySlugs.join('.')}`],
      });
      const removedParentCategoryProducts = products.map((product) => ({
        ...product,
        categories: product.categories?.filter((category) => !categorySlugs.includes(category.slug.current)),
      }));
      setProducts(removedParentCategoryProducts);
    })();
  }, []);

  if (!products) {
    return <SkeletonLoader />;
  }

  return (
    <div className="lago-hot-deals-carousel-wrapper">
      <div className="wrapper">
        <h5>Fresh out of our adventure even!</h5>
        <h3>Piping Hot Deals</h3>
        <Swiper {...hotDealsSwiperSetting}>
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <HotDealsCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HotDealsCarousel;
