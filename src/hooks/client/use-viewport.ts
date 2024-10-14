import { useState } from 'react';
import eventOnMount from '@/hooks/events/eventOnMount';

type ViewportProps = {
  isMobile: boolean;
  isTablet: boolean;
};

const useViewport = (): ViewportProps => {
  const [width, setWidth] = useState(window.innerWidth);

  eventOnMount('resize', () => setWidth(window.innerWidth));

  return {
    isMobile: width <= 480,
    isTablet: width <= 768,
  };
};

export default useViewport;
