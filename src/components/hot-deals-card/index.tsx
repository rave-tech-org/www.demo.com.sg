import { useState } from 'react';
import AspectRatioImage from '@elements/aspect-ratio-image';
import { animated, useSpring } from '@react-spring/web';
import RatingStar from '@elements/icons/rating-star';
import NextImage from '@elements/next-image';

import { CustomCategoryAttributes, CustomFeatures, CustomPrices } from './type';
import { ModifiedProduct } from '@/components/hot-deals-carousel/type';
import { formatCurrency, transformObject } from '@/utils';

const HotDealsCard = (props: ModifiedProduct) => {
  const [hovered, setHovered] = useState(false);

  const springStyle = useSpring({
    right: hovered ? -32 : -12,
    top: hovered ? 16 : 32,
    config: { tension: 100, friction: 20 },
  });
  const { name, features, customPrices: prices, categories, price, imageUrl } = props;

  const customFeature = transformObject<CustomFeatures>(features);
  const customPrices = transformObject<CustomPrices>(prices);

  return (
    <div
      className="lago-hot-deals-card-wrapper"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="card-image-container black-opacity-background">
        <AspectRatioImage src={imageUrl} alt={name || ''} aspectRatio="1/1" priority />
        <animated.div className="special-card-label" style={springStyle}>
          <AspectRatioImage
            src="/assets/images/tour/special-card-label.webp"
            alt="Default Tour Image"
            aspectRatio="1/1"
            priority
            objFit="contain"
          />
        </animated.div>
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
              <span key={`hot-deals-tag-${key}`} className={custom.className}>
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
                <RatingStar percentage={(parseInt(customFeature.rating) / 5) * 100} />
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
    </div>
  );
};

export default HotDealsCard;
