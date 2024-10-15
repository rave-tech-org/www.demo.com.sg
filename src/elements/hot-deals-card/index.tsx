import Image from 'next/image'
import AspectRatioImage from "@elements/aspect-ratio-image";
import { animated, useSpring } from '@react-spring/web';
import { useState } from 'react';

const HotDealsCard = () => {
  const [hovered, setHovered] = useState(false);

  const springStyle = useSpring({
    right: hovered ? -32 : -2,
    top: hovered ? 16 : 32,
    config: { tension: 100, friction: 20 },
  });

  return (
    <div className="lago-hot-deals-card-wrapper"
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
          <Image
            src="/assets/images/tour/special-card-label.png"
            width={48}
            height={48}
            alt="icon instagram"
          />
        </animated.div>
      </div>

      <div className="card-content">
        <div>
          icon
          <span>Tioman Island</span>
        </div>

        <h6>3D2N Berjaya Tioman Resort Full Board Package</h6>

        <div>
          icon
          <span>Tioman Island</span>
        </div>
      </div>
    </div>
  );
};

export default HotDealsCard;
