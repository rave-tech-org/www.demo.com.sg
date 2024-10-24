import { useEffect, useState } from 'react';
import eventOnMount from '@/hooks/events/event-on-mount';

type ViewportProps = {
  isMobile: boolean;
  isTablet: boolean;
};

const useViewport = (): ViewportProps => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    eventOnMount('resize', () => setWidth(window.innerWidth));
  }, []);

  return {
    isMobile: width <= 480,
    isTablet: width <= 768,
  };
};

export default useViewport;
