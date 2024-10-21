import Image from 'next/image';
import { AspectRatioImageProps } from './type';

const AspectRatioImage: React.FC<AspectRatioImageProps> = ({
  src,
  alt,
  aspectRatio = '16/9',
  priority = false,
  objFit = 'cover',
  sizes = '(max-width: 768px) 100vw, 50vw',
  ...props
}) => {
  const [width, height] = aspectRatio.split('/').map(Number);
  const paddingPercentage = (height / width) * 100;

  return (
    <div
      className="aspect-ratio-container"
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: `${paddingPercentage}%`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={0}
        fill
        priority={priority}
        sizes={sizes}
        className="aspect-ratio-img"
        style={{ objectFit: objFit }}
        {...props}
      />
    </div>
  );
};

export default AspectRatioImage;
