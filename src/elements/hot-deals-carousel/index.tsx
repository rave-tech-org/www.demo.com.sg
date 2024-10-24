'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';

import HotDealsCard from '@elements/hot-deals-card';
import { Pagination } from 'swiper/modules';
import { ContentBlock } from '@/sanity/sanity.types';

const slides = ['1', '2', '3', '4', '5'];

const hotDealsSwiperSetting: SwiperOptions = {
  modules: [Pagination],
  pagination: {
    clickable: true,
  },
  centeredSlides: false,
  loop: true,
  slidesPerGroup: 4,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 4,
    },
  },
  spaceBetween: 30,
};

const HotDealsCarousel = ({ block }: { block: ContentBlock }) => {
  return (
    <div className="lago-hot-deals-carousel-wrapper">
      <div className="wrapper">
        <h5>Fresh out of our adventure even!</h5>
        <h3>Piping Hot Deals</h3>
        <Swiper {...hotDealsSwiperSetting}>
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <HotDealsCard />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HotDealsCarousel;
