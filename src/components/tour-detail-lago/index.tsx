'use client';

import AspectRatioImage from '@/elements/aspect-ratio-image';
import RightChevron from '@/elements/icons/right-chevron';
import NextImage from '@/elements/next-image';
import Link from 'next/link';
import RatingStar from '@/elements/icons/rating-star';
import useViewport from '@/hooks/client/use-viewport';
import { Anchor, Collapse, CollapseProps, Image } from 'antd';
import { useEffect, useState } from 'react';
import { client, sanityFetch } from '@/sanity/lib/client';
import { usePathname } from 'next/navigation';
import { ImageProps } from 'next/image';
import { GET_PRODUCT_BY_SLUG } from '@/sanity/lib/queries/cms';
import { ModifiedProduct } from '@components/hot-deals-carousel/type';
import { PortableText } from 'next-sanity';
import { useNextSanityImage } from 'next-sanity-image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

type SanityImageProps = {
  value: SanityImageSource & {
    alt?: string;
  };
};

const SanityImage: React.FC<SanityImageProps> = ({ value }) => {
  const imageProps = useNextSanityImage(client, value);

  if (!imageProps) return null;

  return (
    <Image {...imageProps} alt={value.alt || ' '} sizes="(max-width: 800px) 100vw, 800px" className="rounded-lg" />
  );
};

const TourDetailLago = () => {
  const slug = '3d2n-berjaya-tioman-resort-full-board-package';
  const [product, setProduct] = useState<ModifiedProduct | null>(null);

  useEffect(() => {
    (async () => {
      const product = await sanityFetch<ModifiedProduct>({
        query: GET_PRODUCT_BY_SLUG(slug),
        tags: ['product'],
      });
      setProduct(product);
    })();
  }, [slug]);
  console.log({ product });
  const [visible, setVisible] = useState(false);
  const { isMobile, isTablet, isMdScreen, isXlScreen, isXxlScreen } = useViewport();
  const screenWidths = new Map([
    ['6/1', isMobile],
    ['5/2', isTablet],
    ['4/2', isMdScreen],
    ['4/3', isXlScreen],
    ['3/2', isXxlScreen],
  ]);
  const [ratio] = screenWidths?.entries()?.find(([, cond]) => cond) || ['2/1'];
  const breadcrumbs = [
    {
      text: 'Home',
      link: '/',
    },
    {
      text: 'Malaysia',
      link: '/',
    },
    {
      text: 'Cameron Highlands',
      link: '/',
    },
    {
      text: '3D2N Cameron Highlands Tour',
      link: '/',
    },
  ];

  const buttons = [
    {
      key: 'BOOK NOW',
      value: '/',
    },
    {
      key: 'ENQUIRE',
      value: '/',
    },
    {
      key: 'SHARE',
      value: '/',
    },
  ];

  const components = {
    types: {
      image: SanityImage,
    },
  };

  const items: CollapseProps['items'] = product?.itinerary?.map((it, key) => {
    return {
      key,
      label: it.title,
      // @ts-ignore: fix later
      children: <PortableText value={it?.description || ''} />,
    };
  });

  return (
    <div className="tour-detail-lago">
      <div
        style={{
          backgroundImage: `url('/assets/images/home/bg-topo-print.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'left top',
          width: '100%',
        }}
      >
        <div className="wrapper">
          <div className="breadcrumbs-group">
            {breadcrumbs.map((breadcrumb, key) => (
              <div key={`breadcrumb-${key}`} className="breadcrumbs-item">
                <Link href={breadcrumb.link}>{breadcrumb.text}</Link>
                <RightChevron width={16} height={16} />
              </div>
            ))}
          </div>
        </div>

        <div className="tour-detail-banner">
          <div className="tour-detail-main-info">
            <div className="tour-detail-image-wrapper">
              <Image
                width={200}
                style={{ display: 'none' }}
                src="/assets/images/tour/hero-tour-cover.jpg"
                preview={{
                  visible,
                  src: '/assets/images/tour/hero-tour-cover.jpg',
                  onVisibleChange: (value) => {
                    setVisible(value);
                  },
                }}
              />
              <AspectRatioImage
                src="/assets/images/tour/hero-tour-cover.jpg"
                alt="Default Tour Image"
                aspectRatio={ratio}
                priority
              />
              <NextImage
                onClick={() => setVisible(true)}
                src="/assets/images/tour/icon-zoom.svg"
                width={48}
                height={48}
                alt="icon zoom"
              />
            </div>
            <div className="tour-detail-book-now">
              <div className="wrapper">
                <div className="rating">
                  <RatingStar percentage={(parseInt('4.3') / 5) * 100} />
                  <p>4.3</p> <span>(Based on 3 reviews)</span>
                </div>
                <div className="location-label">
                  <NextImage
                    src="/assets/images/tour/icon-location.svg"
                    width={24}
                    height={24}
                    alt="icon location pin"
                  />
                  <span>Cameron Highlands</span>
                </div>
                <h4 className="text-ellipsis">3D2N Cameron Highlands Tour</h4>
                <span className="travel-code">Tour Code: 3D2NCHT</span>

                <div className="tags">
                  {[1, 2]?.map((category, key) => {
                    return (
                      <span key={`hot-deals-tag-${key}`} className="success">
                        Min. 2-to-go
                      </span>
                    );
                  })}
                </div>

                <div className="pricing">
                  <span>From</span>
                  <h4 className="price">
                    SGD $339 <sup>$400</sup>
                  </h4>
                  <p className="option">
                    <strong>Twin-sharing</strong> (excludes processing fees & taxes if any)
                  </p>
                  <p className="book-now-info">
                    SAVE S$100 <sup>Important note</sup>
                  </p>
                </div>

                <div className="button-group">
                  {buttons.map((button, index) => (
                    <button key={`button-${index}`} className="primary-button outline">
                      <Link href={button.value} target="_blank">
                        {button.key}
                      </Link>
                    </button>
                  ))}
                </div>
                <div className="printout">
                  <div>
                    <NextImage src="/assets/images/tour/icon-transfer.svg" width={32} height={32} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tour-detail-additional-info wrapper">
            <div className="additional-item">
              <div className="icon-wrapper">
                <NextImage src="/assets/images/tour/icon-transfer.svg" width={40} height={40} />
              </div>
              <p>Total Duration</p>
              <span>3 days</span>
            </div>
            <div className="additional-item">
              <div className="icon-wrapper">
                <NextImage src="/assets/images/tour/icon-transfer.svg" width={40} height={40} />
              </div>
              <p>Total Duration</p>
              <span>3 days</span>
            </div>
            <div className="additional-item not-active">
              <div className="icon-wrapper">
                <NextImage src="/assets/images/tour/icon-transfer.svg" width={40} height={40} />
              </div>
              <p>Total Duration</p>
              <span>3 days</span>
            </div>
            <div className="additional-item">
              <div className="icon-wrapper">
                <NextImage src="/assets/images/tour/icon-transfer.svg" width={40} height={40} />
              </div>
              <p>Total Duration</p>
              <span>3 days</span>
            </div>
            <div className="additional-item">
              <div className="icon-wrapper">
                <NextImage src="/assets/images/tour/icon-transfer.svg" width={40} height={40} />
              </div>
              <p>Total Duration</p>
              <span>3 days</span>
            </div>
            <div className="additional-item">
              <div className="icon-wrapper">
                <NextImage src="/assets/images/tour/icon-transfer.svg" width={40} height={40} />
              </div>
              <p>Total Duration</p>
              <span>3 days</span>
            </div>
          </div>
        </div>
      </div>
      <div className="tour-detail-extra wrapper">
        <div>
          <Anchor
            offsetTop={175}
            affix
            showInkInFixed
            items={[
              {
                key: '1',
                href: '#overview',
                title: 'Overview',
              },
              {
                key: '2',
                href: '#itinerary',
                title: 'Itinerary',
              },
              // {
              //   key: '3',
              //   href: '#transportation',
              //   title: 'Transportation',
              // },
              {
                key: '4',
                href: '#accommodation',
                title: 'Accommodation',
              },
              // {
              //   key: '5',
              //   href: '#reviews',
              //   title: 'Reviews',
              // },
              {
                key: '6',
                href: '#things-to-note',
                title: 'Things to Note',
              },
            ]}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 32 }}>
          <div id="overview">
            {product?.overview && <PortableText value={product?.overview} components={components} />}
          </div>
          <div id="itinerary">
            <Collapse accordion items={items} />
          </div>
          <div id="accommodation">
            {product?.accommodation && <PortableText value={product?.accommodation} components={components} />}
          </div>

          <div id="things-to-note">
            {product?.thingsToNote && <PortableText value={product?.thingsToNote} components={components} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailLago;
