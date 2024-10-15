import Image from 'next/image';
import { AspectRatioImageProps } from './type';

const AspectRatioImage: React.FC<AspectRatioImageProps> = ({
  src,
  alt,
  aspectRatio = '16/9',
  priority = false,
  ...props
}) => {
  const [width, height] = aspectRatio.split('/').map(Number);
  const paddingPercentage = (height / width) * 100;

  return (
    <div className="aspect-ratio-container" style={{ paddingBottom: `${paddingPercentage}%` }}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="aspect-ratio-img"
        {...props}
      />
    </div>
  );
};

export default AspectRatioImage;
