import { ContentBlock } from '@/sanity/sanity.types';
import TravelInterestCard from '@components/travel-interest-card';
import { PortableText } from 'next-sanity';
import { ListItemBlock } from '@/components/banner-carousel/type';

const TravelInterestGroup = ({ block }: { block: ContentBlock }) => {
  const { listItems, description, title } = block as ListItemBlock;
  const cards = listItems?.map(({ title, description, imageUrl }) => ({
    title: title,
    desc: description ? <PortableText value={description} /> : '',
    imageUrl,
  }));
  return (
    <div className="lago-travel-interest-group wrapper">
      {description && <PortableText value={description} />}
      <h3>{title}</h3>
      <div className="interest-cards-wrapper">
        {cards?.map((card, key) => <TravelInterestCard key={`lago-travel-card-${key}`} {...card} />)}
      </div>
    </div>
  );
};

export default TravelInterestGroup;
