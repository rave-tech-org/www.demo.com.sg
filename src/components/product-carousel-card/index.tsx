'use client';

import type { GetProductsByCategoryResult } from '@/sanity/sanity.types';
import { formatCurrency, transformObject } from '@/utils';
import AspectRatioImage from '@elements/aspect-ratio-image';
import RatingStar from '@elements/icons/rating-star';
import NextImage from '@elements/next-image';
import { useSpring } from '@react-spring/web';
import Link from 'next/link';
import { useState } from 'react';
import type { CustomCategoryAttributes, CustomFeatures, CustomPrices } from './type';

const ProductCarouselCard = (props: GetProductsByCategoryResult[number]) => {
  const [hovered, setHovered] = useState(false);

  const springStyle = useSpring({
    right: hovered ? -32 : -12,
    top: hovered ? 16 : 32,
    config: { tension: 100, friction: 20 },
  });

  const { name, features, customPrices: prices, categories, price, imageUrl, slug } = props;

  const customFeature = transformObject<CustomFeatures>(features);
  const customPrices = transformObject<CustomPrices>(prices);

  return (
    <div
      className="lago-product-carousel-card-wrapper"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/tour/${slug?.current}`}>
        <div className="card-image-container black-opacity-background">
          <AspectRatioImage src={imageUrl || ''} alt={name || ''} aspectRatio="1/1" priority />
        </div>

        <div className="card-content">
          <div className="location-label">
            <NextImage src="/assets/images/tour/icon-location.svg" width={24} height={24} alt="icon location pin" />
            <span>{customFeature?.['pin-location']}</span>
          </div>

          <h6 className="text-ellipsis">{name}</h6>

          <div className="tags">
            {categories?.map((category, key) => {
              const custom = transformObject<CustomCategoryAttributes>(category?.customAttributes);
              return (
                <span key={`product-carousel-tag-${key}`} className={custom.className}>
                  {category.name}
                </span>
              );
            })}
          </div>

          <div className="pricing">
            {customPrices['discount-price'] && price && (
              <p className="original-price">{formatCurrency(price - Number(customPrices['discount-price']))}</p>
            )}
            <div className="current-price">
              <h6>Fr. {formatCurrency(price)}</h6>
              {customFeature?.rating && (
                <div className="rating">
                  <RatingStar percentage={(Number.parseInt(customFeature.rating) / 5) * 100} />
                  <p>{customFeature.rating}</p>
                </div>
              )}
            </div>
            {customFeature?.['save-info'] && (
              <p className="book-now-info">
                {customFeature?.['save-info']} S${customPrices?.['discount-price']}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCarouselCard;
