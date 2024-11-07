'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';

import HotDealsCard from '@/components/hot-deals-card';
import { Pagination } from 'swiper/modules';
import { sanityFetch } from '@/sanity/lib/client';
import { GET_PRODUCTS_BY_PARENT_CATEGORIES } from '@/sanity/lib/queries/cms';
import SkeletonLoader from '@/elements/skeleton-loader';
import { CategoryBlock, ModifiedProduct } from './type';
import { ContentBlock } from '@/sanity/sanity.types';
import ViewIn from '@elements/view-in';
import { PortableText } from 'next-sanity';

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

const HotDealsCarousel = ({ block }: { block: ContentBlock }) => {
  const { categories, title, description } = block as CategoryBlock;
  const categorySlugs = useMemo(
    () => categories?.map((category) => category.slug.current) || ['hot-deals'],
    [categories]
  );
  const [products, setProducts] = useState<ModifiedProduct[] | null>(null);

  useEffect(() => {
    (async () => {
      const products = await sanityFetch<ModifiedProduct[]>({
        query: GET_PRODUCTS_BY_PARENT_CATEGORIES(categorySlugs),
        tags: [`page.home.products.${categorySlugs.join('.')}`],
      });
      const removedParentCategoryProducts = products.map((product) => ({
        ...product,
        categories: product.categories?.filter((category) => !categorySlugs.includes(category.slug.current)),
      }));
      setProducts(removedParentCategoryProducts);
    })();
  }, [categorySlugs]);

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
