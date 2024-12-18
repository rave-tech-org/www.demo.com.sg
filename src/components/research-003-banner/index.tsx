'use client';

import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';

export default function ResearchZeroZeroThreeBanner({ entries, block }: ContentBlockRegistry) {
  useGSAP(() => {
    let isAnimating = false;

    const splitTextIntoSpans = (selector: string): void => {
      const elements = document.querySelectorAll<HTMLElement>(selector);

      for (const element of elements) {
        const text = element.innerText;
        const splitText = text
          .split('')
          .map((char) => (char === ' ' ? '<span>&nbsp;&nbsp;</span>' : `<span>${char}</span>`))
          .join('');
        element.innerHTML = splitText;
      }
    };

    const initializeCards = (): void => {
      const cards = Array.from(document.querySelectorAll<HTMLDivElement>('.card'));
      gsap.to(cards, {
        y: (i: number) => `${-15 + 15 * i}%`,
        z: (i: number) => 15 * i,
        duration: 1,
        ease: 'cubic',
        stagger: -0.1,
      });
    };

    splitTextIntoSpans('.copy h1');
    initializeCards();

    gsap.set('h1 span', { y: -200 });
    gsap.set('.slider .card:last-child h1 span', { y: 0 });

    const handleClick = (): void => {
      if (isAnimating) return;
      isAnimating = true;

      const slider = document.querySelector<HTMLDivElement>('.slider');
      if (!slider) return;

      const cards = Array.from(slider.querySelectorAll<HTMLDivElement>('.card'));
      const lastCard = cards.pop();
      const nextCard = cards[cards.length - 1];

      if (!lastCard || !nextCard) return;

      gsap.to(lastCard.querySelectorAll('h1 span'), {
        y: 200,
        duration: 0.75,
        ease: 'cubic',
      });

      gsap.to(lastCard, {
        y: '+=150%',
        duration: 0.75,
        ease: 'cubic',
        onComplete: () => {
          slider.prepend(lastCard);
          initializeCards();
          gsap.set(lastCard.querySelectorAll('h1 span'), { y: -200 });
          setTimeout(() => {
            isAnimating = false;
          }, 1000);
        },
      });

      gsap.to(nextCard.querySelectorAll('h1 span'), {
        y: 0,
        duration: 1,
        ease: 'cubic',
        stagger: 0.05,
      });
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  return (
    <div className="research-003-banner relative min-h-screen bg-[#dfe1c8] overflow-hidden">
      <div className="absolute centered size-full overflow-hidden slider">
        {block?.listItems?.map((e, index) => {
          if (!e.imageUrl) return null;
          return (
            <div className="card" key={index}>
              <Image
                width={1000}
                height={1000}
                src={e.imageUrl}
                alt={`Slide ${index}`}
                className="size-full object-cover opacity-[0.75] absolute"
              />
              <div className="absolute centered w-full copy">
                <h1 className="relative text-center uppercase text-[#dfe1c8]">{e.title}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
