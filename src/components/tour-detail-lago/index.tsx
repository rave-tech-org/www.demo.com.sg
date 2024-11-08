'use client';

import AspectRatioImage from '@/elements/aspect-ratio-image';
import RightChevron from '@/elements/icons/right-chevron';
import NextImage from '@/elements/next-image';
import { transformObject } from '@/utils';
import Link from 'next/link';
import { CustomCategoryAttributes } from '@components/hot-deals-card/type';
import RatingStar from '@/elements/icons/rating-star';

const TourDetailLago = () => {
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
              <AspectRatioImage
                src="/assets/images/home/banner-customised-tour.webp"
                alt="Default Tour Image"
                aspectRatio="2/1"
                priority
              />
            </div>
            <div className="tour-detail-book-now">
              <div className="wrapper">
                <div className="rating">
                  <RatingStar percentage={(parseInt('4.3') / 5) * 100} />
                  <p>4.3</p> <span>(Based on 3 reviews)</span>
                  {/* <p>{customFeature.rating}</p> */}
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
                    // const custom = transformObject<CustomCategoryAttributes>(category?.customAttributes);
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
              </div>
            </div>
          </div>
          <div className="tour-detail-additional-info">3days</div>
        </div>
      </div>
      {/* <div className="tour-detail-extra wrapper">
        <div className="tour-detail-anchor">
          <Anchor>
            <AnchorLink href="overview">Overview</AnchorLink>
            <AnchorLink href="itinerary">Itinerary</AnchorLink>
            <AnchorLink href="transportation">Transportation</AnchorLink>
            <AnchorLink href="accommodation">Accommodation</AnchorLink>
            <AnchorLink href="reviews">Reviews</AnchorLink>
            <AnchorLink href="things-to-note">Things to Note</AnchorLink>
          </Anchor>
        </div>
        <div className="tour-detail-panel">
          <AnchorPoint id="overview">
            <h1>Overview</h1>
          </AnchorPoint>
          <AnchorPoint id="itinerary">
            <h1>Itinerary</h1>
          </AnchorPoint>
          <AnchorPoint id="transportation">
            <h1>Transportation</h1>
          </AnchorPoint>
          <AnchorPoint id="accommodation">
            <h1>Accommodation</h1>
          </AnchorPoint>
          <AnchorPoint id="reviews">
            <h1>Reviews</h1>
          </AnchorPoint>
          <AnchorPoint id="things-to-note">
            <h1>Things to Note</h1>
          </AnchorPoint>
        </div>
      </div> */}
    </div>
  );
};

export default TourDetailLago;
