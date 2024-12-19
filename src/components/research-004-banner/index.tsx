'use client';

import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import NextImage from '@/elements/next-image';
import { useGSAP } from '@gsap/react';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
gsap.registerPlugin(MotionPathPlugin);

interface NavProps {
  horizontalNavigation?: boolean;
  mapImage?: boolean;
}

type FourthBannerProps = NavProps & ContentBlockRegistry;

const VerticalCarousel: React.FC<FourthBannerProps> = ({
  horizontalNavigation = false,
  entries,
  block,
  mapImage = false,
}) => {
  const ListItems: any = block?.listItems;

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [prevIndex, setPrevIndex] = useState(0);

  const handleNext = () => {
    setPrevIndex(activeIndex);
    setActiveIndex((prev) => (prev + 1) % ListItems?.length);
  };

  const handlePrev = () => {
    setPrevIndex(activeIndex);
    setActiveIndex((prev) => (prev - 1 + ListItems.length) % ListItems.length);
  };

  // const radius = 250;

  useGSAP(() => {
    if (containerRef.current && svgRef.current) {
      const items = Array.from(containerRef.current.children);
      const angleIncrement = 360 / ListItems.length; // equal spacing around the circle

      const circlePath = MotionPathPlugin.convertToPath('#holder', false)[0];
      if (!circlePath) return;

      // remove old paths if already appended
      const existingPath = svgRef.current.querySelector('#circlePath');
      if (existingPath) existingPath.remove();

      // add the new path to the SVG
      circlePath.id = 'circlePath';
      svgRef.current.prepend(circlePath);

      // const reversedItems = items.slice().reverse();

      // animate each item along the circle
      items.forEach((item, index) => {
        // calculate the position relative to the East (90°) position
        const positionIndex = (index - activeIndex - 1 + ListItems.length) % ListItems.length;

        // adjust the angle to ensure active index starts at East (90°)
        const angle = angleIncrement * positionIndex;

        const radians = (angle * Math.PI) / 180; // Convert to radians

        const direction = activeIndex > prevIndex ? 1 : -1; // 1 for clockwise, -1 for counterclockwise

        // define start and end positions along the path (normalize to path percentage)
        const start = (positionIndex / ListItems.length) * direction;
        const end = ((positionIndex + 1) / ListItems.length) * direction;

        let opacity = 0;
        if (index === activeIndex) {
          opacity = 1;
        } else if (
          index === (activeIndex - 1 + ListItems.length) % ListItems.length ||
          index === (activeIndex + 1) % ListItems.length
        ) {
          opacity = 0.5; //
        }

        gsap.to(item, {
          motionPath: {
            path: circlePath,
            align: circlePath,
            alignOrigin: [0.5, 0.5],
            start,
            end,
          },
          opacity: opacity,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    }
  }, [activeIndex]);

  return (
    <div
      className="research-004-banner relative flex items-center justify-start h-screen overflow-hidden"
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
        id="prev"
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
        id="next"
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

      <div
        className="rail absolute"
        style={{
          // width: radius * 2,
          // height: radius * 2,
          width: '653px',
          height: '686px',
          border: '1px dashed rgba(255, 255, 255, 0.5)',
          borderRadius: '50%',
          left: '-392px',
        }}
      ></div>
      <svg ref={svgRef} viewBox="0 0 300 300">
        <circle id="holder" className="st0" cx="151" cy="151" r="150" />
      </svg>
      {/* content */}
      <div
        ref={containerRef}
        className=" relative w-96 h-96 rounded-full flex items-center justify-center left-[-30px]"
      >
        {ListItems?.map((tour: any, index: number) => (
          <div key={index + 1} className="absolute h-8 flex flex-row items-center w-[400px] text-white gap-4">
            <div
              className={`${index === activeIndex ? 'font-bold outline outline-1 outline-offset-4 outline-white ' : 'mr-8'} w-4 h-4 bg-white rounded-full`}
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
