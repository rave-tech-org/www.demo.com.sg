'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';
import { transformObject } from '@/utils';
import Link from 'next/link';
import { BannerBlock, CustomBannerAttribute } from './type';
import { PortableText } from 'next-sanity';
import { ContentBlock } from '@/sanity/sanity.types';
import ViewIn from '@elements/view-in';

const bannerSwiperSetting: SwiperOptions = {
  slidesPerView: 1.2,
  loopAdditionalSlides: 1,
  initialSlide: 2,
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 1.2,
    },
    480: {
      slidesPerView: 2.4,
    },
  },
  spaceBetween: 8,
};

const BannerCarousel = ({ block }: { block: ContentBlock }) => {
  const { customAttributes, listItems } = block as BannerBlock;
  const custom = transformObject<CustomBannerAttribute>(customAttributes);

  const target = custom?.['is-button-redirect-new-window'] ? '_blank' : '_self';
  const href = custom?.['button-redirect-link'];
  const buttonText = custom?.['button-text'];

  return (
    <ViewIn variant="slideUp" delay={200}>
      <div className="lago-banner-carousel-wrapper">
        <Swiper {...bannerSwiperSetting}>
          {listItems?.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  position: 'relative',
                  backgroundImage: `url(${item?.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100%',
                  height: 'clamp(300px, 40vw, 800px)',
                  borderRadius: '10px',
                }}
                className="black-opacity-background"
              />
              <div className="content">
                <h1>{item.title}</h1>
                {item.description && <PortableText value={item.description} />}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {custom && (
          <button className="primary-button">
            <Link href={href} target={target}>
              {buttonText}
            </Link>
          </button>
        )}
      </div>
    </ViewIn>
  );
};

export default BannerCarousel;
