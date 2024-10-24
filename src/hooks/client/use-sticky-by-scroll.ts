import { useEffect, useState } from 'react';
import eventOnMount from '@/hooks/events/event-on-mount';

const useStickyByScroll = (menuHeight: number): boolean => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > menuHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    eventOnMount('scroll', () => handleScroll);
  }, [menuHeight]);

  return isSticky;
};

export default useStickyByScroll;
