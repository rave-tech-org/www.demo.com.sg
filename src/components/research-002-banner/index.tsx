'use client';

import { Entries } from '@/hooks/local/use-entries';
import type { GetContentBlockResult } from '@/sanity/sanity.types';
import { Swiper } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { EffectFade, Mousewheel, Pagination } from 'swiper/modules';
import { useEffect } from 'react';
import { ResearchZeroZeroTwoBannerProps } from './type';
import { PortableText } from 'next-sanity';

export default function ResearchZeroZeroTwoBanner<
  B extends GetContentBlockResult = GetContentBlockResult,
  E = Entries,
>({ block }: ResearchZeroZeroTwoBannerProps<B, E>) {
  const data = block?.listItems || [];
  //   console.log(data);

  useEffect(() => {
    Swiper.use([Mousewheel, Pagination, EffectFade]);

    const swiper = new Swiper('.swiper-container', {
      direction: 'vertical',
      effect: 'fade',
      speed: 1000,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      mousewheel: {
        invert: false,
        forceToAxis: false,
        thresholdDelta: 50,
        sensitivity: 1,
      },
      on: {
        slideChange: function () {
          const swiperInstance = this as unknown as Swiper;

          swiperInstance.slides.forEach((slide) => {
            const background = (slide as HTMLElement).querySelector('.background');
            if (background) {
              background.classList.remove('animation');
            }
          });

          const activeSlide = swiperInstance.slides[swiperInstance.activeIndex] as HTMLElement;
          const background = activeSlide.querySelector('.background');
          if (background) {
            background.classList.add('animation');
          }
        },
      },
    });

    return () => {
      swiper.destroy();
    };
  }, []);

  return (
    <div className="research-002-banner-wrapper">
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {data.map((item, index) => {
            return (
              <div className="swiper-slide" key={index}>
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
              </div>
            );
          })}
        </div>
        <div className="swiper-pagination"></div>
      </div>

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
