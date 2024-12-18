'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import NextImage from '@/elements/next-image';

interface NavProps {
  horizontalNavigation?: boolean;
  mapImage?: boolean;
}

type FourthBannerProps = NavProps & ContentBlockRegistry;

const VerticalCarousel: React.FC<FourthBannerProps> = ({
  horizontalNavigation = true,
  entries,
  block,
  mapImage = true,
}) => {
  const ListItems: any = block?.listItems;

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % ListItems?.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + ListItems.length) % ListItems.length);
  };

  const radius = 230;

  useEffect(() => {
    if (containerRef.current) {
      const items = Array.from(containerRef.current.children);

      const angleIncrement = 360 / ListItems.length; // equal spacing around the circle
      const prevIndex = (activeIndex - 1 + ListItems.length) % ListItems.length;
      const nextIndex = (activeIndex + 1) % ListItems.length;
      items.forEach((item, index) => {
        const angle = angleIncrement * (index - activeIndex) * (Math.PI / 180); // convert to radians
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        gsap.to(item, {
          x,
          y,
          scale: index === activeIndex ? 1.2 : 0.8, // highlight active item
          opacity:
            index === activeIndex
              ? 1 // active item full opacity
              : index === prevIndex || index === nextIndex
                ? 0.5 // surrounding items have half opacity
                : 0, // all other items are fully hidden
          duration: 0.8,
          ease: 'power3.out',
        });
      });
    }
  }, [activeIndex]);

  return (
    <div
      className="relative flex items-center justify-start h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${ListItems[activeIndex].imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background 0.8s ease',
      }}
    >
      {/* navigation buttons */}
      <button
        onClick={handlePrev}
        className={`absolute  z-10 text-white ${horizontalNavigation ? 'bottom-0 right-[17%] rotate-180' : 'top-[30%] -rotate-90'}`}
      >
        <NextImage
          src={'/assets/images/home/long-arrow.svg'}
          width={100}
          height={100}
          alt="arrow "
          className="transition-opacity hover:opacity-70"
        />
      </button>

      <button
        onClick={handleNext}
        className={`absolute z-10 text-white ${horizontalNavigation ? 'bottom-0 right-[5%] ' : 'bottom-[30%] rotate-90'}`}
      >
        <NextImage
          src={'/assets/images/home/long-arrow.svg'}
          width={100}
          height={100}
          alt="arrow "
          className="transition-opacity hover:opacity-70"
        />
      </button>

      {/* half circle */}
      <div className="border rounded-full w-[446px] h-[497px] absolute left-[-275px]" />

      {/* content */}
      <div ref={containerRef} className="relative w-96 h-96 rounded-full flex items-center justify-center left-[-30px]">
        {ListItems?.map((tour: any, index: number) => (
          <div key={index + 1} className="absolute h-8 flex flex-row items-center w-[400px] text-white gap-4">
            <div
              className={`${index === activeIndex ? 'font-bold outline outline-1 outline-offset-4 outline-white transform translate-x-[7px] mr-[13px]' : 'transform translate-x-[-27px] mr-8'} w-4 h-4 bg-white rounded-full`}
            ></div>
            <div className="flex flex-row gap-2 items-center">
              <NextImage
                src={tour.imageUrl}
                alt={tour.title}
                width={70}
                height={70}
                className={`${mapImage ? 'block' : 'hidden'} w-full h-full border-4 border-white`}
              />
              <div className="flex flex-col">
                <h3 className="mt-0 text-2xl font-bold">{tour.title}</h3>
                <p className="text-lg opacity-80">{tour.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalCarousel;
