import { ImageProps } from "next/image";

export interface AspectRatioImageProps extends Omit<ImageProps, 'width' | 'height' | 'style'> {
  aspectRatio?: string;
  priority?: boolean;
}
