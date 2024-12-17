'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// Tour interface
interface Tour {
  id: number;
  title: string;
  location: string;
  image: string;
}

// Tour data
const tours: Tour[] = [
  {
    id: 1,
    title: 'Famara Beach',
    location: 'Spain',
    image:
      'https://cdn.sanity.io/images/e7mpw8ak/demo-production/e3f1e533821763cc01bcb4062c1b8e4293c20aba-805x924.png?fit=max&w=1200&h=1200',
  },
  {
    id: 2,
    title: 'Bingin Beach',
    location: 'Bali, Indonesia',
    image:
      'https://cdn.sanity.io/images/e7mpw8ak/demo-production/339acc36342f2158559bc42020bb21db2706d09f-2070x1380.jpg?fit=max&w=1200&h=1200',
  },
  {
    id: 3,
    title: 'Pipa Beach',
    location: 'Brazil',
    image:
      'https://cdn.sanity.io/images/e7mpw8ak/demo-production/30e43e286d4151822ac4a9d36e3867e6b33a3269-2070x1380.jpg?fit=max&w=1200&h=1200',
  },
  {
    id: 4,
    title: 'Testing',
    location: 'Somewhere',
    image:
      'https://cdn.sanity.io/images/e7mpw8ak/demo-production/6a244e32d6a1f3c54f7311d7bc34f333258d5300-4096x3072.jpg?fit=max&w=1200&h=1200',
  },
  {
    id: 5,
    title: 'Japan',
    location: 'Japan',
    image:
      'https://cdn.sanity.io/images/e7mpw8ak/demo-production/0a91c4490e644b0679b027cbcec43623dbea9a92-1920x1080.jpg?fit=max&w=1200&h=1200',
  },
];

interface BannerHomeProps {
  horizontalNavigation?: boolean;
}

const VerticalCarousel: React.FC<BannerHomeProps> = ({ horizontalNavigation = false }) => {
  const [activeIndex, setActiveIndex] = useState(1); // Default active item
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % tours.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + tours.length) % tours.length);
  };

  useEffect(() => {
    if (containerRef.current) {
      gsap.to(containerRef.current.children, {
        duration: 0.8,
        opacity: (i: number) => (i === activeIndex ? 1 : 0.4),
        scale: (i: number) => (i === activeIndex ? 1 : 0.8),
        y: (i: number) => (i - activeIndex) * 150,
        ease: 'power3.out',
      });
    }
  }, [activeIndex]);

  return (
    <div
      className="relative flex items-center justify-start h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${tours[activeIndex].image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background 0.8s ease',
      }}
    >
      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className={`absolute  z-10 bg-black text-white px-4 py-2 rounded hover:bg-gray-700 ${horizontalNavigation ? 'bottom-0 right-[20%] rotate-[270deg]' : 'top-[40%]'}`}
      >
        ▲
      </button>

      <button
        onClick={handleNext}
        className={`absolute z-10 bg-black text-white px-4 py-2 rounded hover:bg-gray-700 ${horizontalNavigation ? 'bottom-0 right-[10%] rotate-[270deg]' : 'bottom-[40%] '}`}
      >
        ▼
      </button>

      {/* Carousel Container */}
      <div ref={containerRef} className="relative w-64 h-[300px] flex flex-col items-center justify-center">
        {tours.map((tour, index) => (
          <div
            key={tour.id}
            className="absolute w-full flex flex-col items-center text-white"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            {/* <img
              src={tour.image}
              alt={tour.title}
              className="w-40 h-40 object-cover rounded-full border-4 border-white"
            /> */}
            <h3 className="mt-4 text-2xl font-bold">{tour.title}</h3>
            <p className="text-lg opacity-80">{tour.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalCarousel;
