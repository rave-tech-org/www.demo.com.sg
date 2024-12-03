'use client';

import { Entries } from '@/hooks/local/use-entries';
import type { GetContentBlockResult } from '@/sanity/sanity.types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { EffectFade, Mousewheel, Pagination } from 'swiper/modules';
import { ResearchZeroZeroTwoBannerProps } from './type';
import { PortableText } from 'next-sanity';

export default function ResearchZeroZeroTwoBanner<
  B extends GetContentBlockResult = GetContentBlockResult,
  E = Entries,
>({ block }: ResearchZeroZeroTwoBannerProps<B, E>) {
  const data = block?.listItems || [];
  return (
    <div className="research-002-banner-wrapper">
      <Swiper
        modules={[Mousewheel, Pagination, EffectFade]}
        className="swiper-container"
        direction="vertical"
        effect="fade"
        speed={1000}
        loop={true}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
        }}
        mousewheel={{
          invert: false,
          forceToAxis: false,
          thresholdDelta: 50,
          sensitivity: 1,
        }}
        onSlideChange={(swiper) => {
          swiper.slides.forEach((slide) => {
            const background = (slide as HTMLElement).querySelector('.background');
            if (background) {
              background.classList.remove('animation');
            }
          });

          const activeSlide = swiper.slides[swiper.activeIndex] as HTMLElement;
          const background = activeSlide.querySelector('.background');
          if (background) {
            background.classList.add('animation');
          }
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="content" data-content="one">
              <h1>{item.title}</h1>
              <div>
                <PortableText value={item.description ?? []} />
              </div>
            </div>
            <div
              className="background"
              style={{
                backgroundImage: `url(${item.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: '50% 40%',
              }}
            ></div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination"></div>
      </Swiper>

      <div className="footer">
        <div className="feature">
          <i className="fa-solid fa-house"></i>
          <div>
            <p>Accommodation</p>
            <small>5 days</small>
          </div>
        </div>
        <hr />
        <div className="feature">
          <i className="fa-solid fa-headphones"></i>
          <div>
            <p>Live guide</p>
            <small>available</small>
          </div>
        </div>
        <hr />
        <div className="feature">
          <i className="fa-solid fa-clock"></i>
          <div>
            <p>Easy cancellation</p>
            <small>cancel before 48 hours</small>
          </div>
        </div>
        <hr />
        <button className="btn">Book Now</button>
      </div>
    </div>
  );
}
