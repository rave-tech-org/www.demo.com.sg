import AspectRatioImage from '../aspect-ratio-image';

interface TravelInterestCard {
  title: string;
  desc: string;
  imageUrl?: string;
}

const TravelInterestCard = ({ imageUrl, title, desc }: TravelInterestCard) => {
  return (
    <div className="lago-travel-interest-card">
      <div className="image-circle-wrapper">
        <AspectRatioImage
          src={imageUrl || '/assets/images/tour/tour-default.webp'}
          alt="Default Tour Image"
          aspectRatio="1/1"
          priority
        />
      </div>
      <div className="content">
        <p>{title}</p>
        <span className="text-ellipsis">{desc}</span>
      </div>
    </div>
  );
};

export default TravelInterestCard;
