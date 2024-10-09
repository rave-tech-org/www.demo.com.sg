"use client"

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

const slides = [
  'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/4016596/pexels-photo-4016596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
];

const BannerCarousel: React.FC = () => {
  return (
    <Swiper
      slidesPerView={2.5}
      loopAdditionalSlides={1}
      initialSlide={2}
      loop={true}
      breakpoints={{
        320: {
          slidesPerView: 1.25
        },
        480: {
          slidesPerView: 2.5
        },
      }}
      spaceBetween={20}
    >
    {slides.map((slide, index) => (
      <SwiperSlide key={index}>
        <div
          style={{
            backgroundImage: `url(${slide})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "40vw",
            borderRadius: "10px",
          }}
        />
      </SwiperSlide>
    ))}
  </Swiper>
  );
};

export default BannerCarousel;
