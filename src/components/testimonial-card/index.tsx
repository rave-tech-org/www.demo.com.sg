import AspectRatioImage from '@/elements/aspect-ratio-image';
import type { TestimonialCardProps } from './type';

const TestimonialCard = ({ imageUrl, author, productName, desc }: TestimonialCardProps) => {
  return (
    <div className="lago-testimonial-card">
      <div className="image-wrapper">
        <AspectRatioImage
          src="/assets/images/home/icon-quote.webp"
          alt={productName || ''}
          aspectRatio="1/1"
          priority
        />
      </div>
      <div className="testimonial-text">
        <span>{desc}</span>
        <div className="content">
          <div>
            <p className="author">{author}</p>
            <span>{productName}</span>
          </div>
          <div className="image-circle-wrapper">
            <AspectRatioImage
              src={imageUrl || '/assets/images/tour/tour-default.webp'}
              alt="Default Tour Image"
              aspectRatio="1/1"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
