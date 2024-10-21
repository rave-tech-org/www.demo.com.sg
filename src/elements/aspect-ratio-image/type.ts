import { ImageProps } from "next/image";

export interface AspectRatioImageProps extends Omit<ImageProps, 'width' | 'height' | 'style'> {
  aspectRatio?: string;
  priority?: boolean;
  objFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}
