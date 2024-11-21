'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';

import HotDealsCard from '@/components/hot-deals-card';
import { Pagination } from 'swiper/modules';
import SkeletonLoader from '@/elements/skeleton-loader';
import { GetContentBlockResult } from '@/sanity/sanity.types';
import ViewIn from '@elements/view-in';
import { PortableText } from 'next-sanity';
import { Entries } from '@/resources/content-block-registry';

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

const HotDealsCarousel = ({ block, entries }: { block: GetContentBlockResult; entries?: Entries }) => {
  const categories = block?.categories;
  const title = block?.title;
  const description = block?.description;
  const productEntries = entries?.products;
  const categorySlugs = categories?.map((category) => category?.slug?.current);

  const products = productEntries
    ?.filter((product) =>
      categorySlugs?.some((categorySlug) =>
        product.categories?.some((category) => category.slug?.current === categorySlug)
      )
    )
    .map((product) => ({
      ...product,
      categories:
        product.categories?.filter((category) => !categorySlugs?.includes(category?.slug?.current || '')) || null,
    }));

  if (!products) {
    return <SkeletonLoader />;
  }

  return (
    <ViewIn variant="slideUp" delay={200}>
      <div className="lago-hot-deals-carousel-wrapper">
        <div className="wrapper">
          {description && <PortableText value={description} />}
          <h3>{title}</h3>
          <Swiper {...hotDealsSwiperSetting}>
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                <HotDealsCard {...product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </ViewIn>
  );
};

export default HotDealsCarousel;
