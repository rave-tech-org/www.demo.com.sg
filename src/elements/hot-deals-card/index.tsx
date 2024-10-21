import { useState } from 'react';
import AspectRatioImage from "@elements/aspect-ratio-image";
import { animated, useSpring } from '@react-spring/web';
import RatingStar from '@elements/icons/rating-star';
import NextImage from '@elements/next-image';

const HotDealsCard = () => {
  const [hovered, setHovered] = useState(false);

  const springStyle = useSpring({
    right: hovered ? -32 : -12,
    top: hovered ? 16 : 32,
    config: { tension: 100, friction: 20 },
  });

  return (
    <div
      className="lago-hot-deals-card-wrapper"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="card-image-container">
        <AspectRatioImage
          src="/assets/images/tour/tour-default.webp"
          alt="Default Tour Image"
          aspectRatio="1/1"
          priority
        />
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
          <NextImage
            src="/assets/images/tour/icon-location.svg"
            width={24}
            height={24}
            alt="icon location pin"
          />
          <span>Tioman Island</span>
        </div>

        <h6 className="text-ellipsis">3D2N Berjaya Tioman Resort Full Board Package 3D2N Berjaya Tioman Resort Full Board Package</h6>

        <div className="tags visible">
          <span>Min. 2-to-go</span>
          <span className="success">Guaranteed Stay</span>
          <span className="special">Seasoned Sepcial</span>
        </div>

        <div className="pricing">
          <p className="original-price">S$719</p>
          <div className="current-price">
            <h6>Fr. S$619</h6>
            <div className="rating">
              <RatingStar percentage={(4.5/5) * 100} />
              <p>4.5</p>
            </div>
          </div>
          <p className="book-now-info">Book now to save S$100</p>
        </div>
      </div>
    </div>
  );
};

export default HotDealsCard;
