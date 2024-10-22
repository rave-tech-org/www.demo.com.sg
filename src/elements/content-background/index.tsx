'use client';

import useViewport from '@/hooks/client/use-viewport';
import AspectRatioImage from '@elements/aspect-ratio-image';

const ContentBackground = () => {
  const { isTablet } = useViewport();
  const aspectRatio = isTablet ? '2/1' : '3/1';
  return (
    <div className="lago-content-background">
      <AspectRatioImage
        src="/assets/images/home/banner-customised-tour.webp"
        alt="Banner Customise Tour"
        aspectRatio={aspectRatio}
        hasBlackOpacityBackground
        priority
      />
      <div className="content">
        <h6>Your Way, Your Malaysia</h6>
        <h3>Tailoring MY Tour Experience</h3>
      </div>
    </div>
  );
};

export default ContentBackground;
