import Image, { ImageProps } from 'next/image';

interface NextImageProps extends Omit<ImageProps, 'width' | 'height' | 'alt'> {
  width?: number;
  height?: number;
  alt?: string;
}

const NextImage: React.FC<NextImageProps> = ({ width, height, alt, ...props }) => {
  return <Image width={0} height={0} style={{ width, height }} alt={alt || 'default demo image'} {...props} />;
};

export default NextImage;
