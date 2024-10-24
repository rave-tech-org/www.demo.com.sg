import { ContentBlock } from '@/sanity/sanity.types';
import TravelInterestCard from '@elements/travel-interest-card';

const TravelInterestGroup = ({ block }: { block: ContentBlock }) => {
  const cards = [
    {
      title: 'Adventure Travel',
      desc: 'Thrilling journeys that push your limits and ignite your spirit!',
    },
    {
      title: 'Adventure Travel',
      desc: 'Thrilling journeys that push your limits and ignite your spirit!',
    },
    {
      title: 'Adventure Travel',
      desc: 'Thrilling journeys that push your limits and ignite your spirit!',
    },
    {
      title: 'Adventure Travel',
      desc: 'Thrilling journeys that push your limits and ignite your spirit!',
    },
    {
      title: 'Adventure Travel',
      desc: 'Thrilling journeys that push your limits and ignite your spirit!',
    },
    {
      title: 'Adventure Travel',
      desc: 'Thrilling journeys that push your limits and ignite your spirit!',
    },
  ];
  return (
    <div className="wrapper">
      <div className="lago-travel-interest-group">
        {cards.map((card, key) => (
          <TravelInterestCard key={`lago-travel-card-${key}`} {...card} />
        ))}
      </div>
    </div>
  );
};

export default TravelInterestGroup;
