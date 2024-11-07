'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';

import { Navigation } from 'swiper/modules';
import { ContentBlock } from '@/sanity/sanity.types';
import { CategoryBlock, ModifiedProduct } from '@/components/hot-deals-carousel/type';
import SkeletonLoader from '@elements/skeleton-loader';
import ViewIn from '@elements/view-in';
import AspectRatioImage from '@elements/aspect-ratio-image';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import TestimonialCard from '@components/testimonial-card';
import { sanityFetch } from '@/sanity/lib/client';
import { GET_POSTS, GET_TESTIMONIALS } from '@/sanity/lib/queries/cms';
import { TestimonialType } from './type';

const testimonialSwiperSetting: SwiperOptions = {
  slidesPerView: 1.4,
  loopAdditionalSlides: 1,
  initialSlide: 2,
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 1.1,
    },
    480: {
      slidesPerView: 1.1,
    },
    768: {
      slidesPerView: 1.8,
    },
    1200: {
      slidesPerView: 2.8,
    },
  },
  spaceBetween: 8,
};

const TestimonialCarousel = ({ block }: { block: ContentBlock }) => {
  const { title, description } = block as CategoryBlock;
  const [testimonials, setTestimonials] = useState<TestimonialType[] | null>(null);

  useEffect(() => {
    (async () => {
      const testimonials = await sanityFetch<TestimonialType[]>({
        query: GET_TESTIMONIALS,
        tags: ['testimonial'],
      });
      setTestimonials(testimonials);
    })();
  }, []);

  if (!testimonials) {
    return <SkeletonLoader />;
  }

  return (
    <ViewIn variant="slideUp" delay={200}>
      <div className="lago-testimonial-carousel-wrapper">
        {description && <PortableText value={description} />}
        <Swiper {...testimonialSwiperSetting}>
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard
                imageUrl={testimonial.imageUrl}
                author={testimonial.name}
                productName={testimonial.product.name}
                desc={testimonial.testimonialText}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="button-wrapper">
          <button className="primary-button outline">
            <p>{title}</p>
          </button>
        </div>
      </div>
    </ViewIn>
  );
};

export default TestimonialCarousel;
