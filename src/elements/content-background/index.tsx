'use client';

import useViewport from '@/hooks/client/use-viewport';
import { ContentBlock } from '@/sanity/sanity.types';
import { transformObject } from '@/utils';
import AspectRatioImage from '@elements/aspect-ratio-image';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import { CustomContentBackgroundAttribute } from './type';
import ViewIn from '@elements/view-in';

const ContentBackground = ({ block }: { block: ContentBlock }) => {
  const { isMobile, isTablet } = useViewport();
  const aspectRatio = isMobile ? '.5/1' : isTablet ? '2/1' : '3/1';
  const { customAttributes } = block;
  const custom = transformObject<CustomContentBackgroundAttribute>(customAttributes);
  const buttons = Object.keys(custom).map((key) => ({
    key: key.replaceAll('-', ' ').toUpperCase(),
    value: custom?.[key as keyof CustomContentBackgroundAttribute],
  }));
  return (
    <ViewIn variant="slideUp" delay={200}>
      <div className="lago-content-background">
        <AspectRatioImage
          src="/assets/images/home/banner-customised-tour.webp"
          alt="Banner Customise Tour"
          aspectRatio={aspectRatio}
          hasBlackOpacityBackground
          priority
        />
        <div className="content">
          {block.description && <PortableText value={block.description} />}
          <div className="button-group">
            {buttons.map((button, index) => (
              <button key={`button-${index}`} className="primary-button">
                <Link href={button.value} target="_blank">
                  {button.key}
                </Link>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ViewIn>
  );
};

export default ContentBackground;
