import Image, { ImageProps } from 'next/image';

interface NextImageProps extends Omit<ImageProps, 'width' | 'height'> {
  width?: number;
  height?: number;
}

const NextImage: React.FC<NextImageProps> = ({ width, height, ...props }) => {
  return (
    <Image 
      width={0}
      height={0}
      style={{ width, height }}
      {...props}
    />
  );
};

export default NextImage;
