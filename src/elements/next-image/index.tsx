import Image, { ImageProps } from 'next/image';

interface NextImageProps extends Omit<ImageProps, 'width' | 'height' | 'alt'> {
  width?: number;
  height?: number;
  alt?: string;
}

const NextImage: React.FC<NextImageProps> = ({ width, height, alt, ...props }) => {
  return <Image width={0} height={0} style={{ width, height }} alt={alt || 'default lago image'} {...props} />;
};

export default NextImage;
