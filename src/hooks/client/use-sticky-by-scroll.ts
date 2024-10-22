import { useEffect, useState } from 'react';
import eventOnMount from '@/hooks/events/eventOnMount';

const useStickyByScroll = (menuHeight: number): boolean => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > menuHeight) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    eventOnMount('scroll', () => handleScroll);
  }, []);

  return isSticky;
};

export default useStickyByScroll;
