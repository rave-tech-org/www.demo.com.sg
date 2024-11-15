import AspectRatioImage from '@/elements/aspect-ratio-image';
import TravelInterestCard from '../travel-interest-card';
import { DestinationProduct } from './type';
import { PortableText } from 'next-sanity';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import RightChevron from '@/elements/icons/right-chevron';
import { PostType } from '@components/see-more-articles/type';
import SkeletonLoader from '@/elements/skeleton-loader';

const DestinationDetailLago = ({
  product,
  breadcrumbs,
  posts,
}: {
  product: DestinationProduct;
  breadcrumbs?: { text: string; link: string }[];
  posts?: PostType[];
}) => {
  console.log({ product });
  if (!product) {
    return <SkeletonLoader />;
  }
  const cards = [
    {
      title: 'Land Area',
      desc: product?.landArea,
      imageUrl: '',
    },
    {
      title: 'Average Climate',
      desc: product?.averageClimate,
      imageUrl: '',
    },
    {
      title: 'Good Travel Duration',
      desc: product?.travelDuration,
      imageUrl: '',
    },
    {
      title: 'Peak Season',
      desc: product?.peakSeason,
      imageUrl: '',
    },
    {
      title: 'Mid Season',
      desc: product?.midSeason,
      imageUrl: '',
    },
    {
      title: 'Monsoon Season',
      desc: product?.monsoonSeason,
      imageUrl: '',
    },
  ];

  return (
    <div className="destination-detail-lago">
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
            {breadcrumbs?.map((breadcrumb, key) => (
              <div key={`breadcrumb-${key}`} className="breadcrumbs-item">
                <Link href={breadcrumb.link}>{breadcrumb.text}</Link>
                <RightChevron width={16} height={16} />
              </div>
            ))}
          </div>
        </div>

        <div className="lago-content-background">
          <AspectRatioImage src={product.imageUrl} alt={product.name || ''} aspectRatio="3/1" priority />
          {product.description && (
            <div className="content">
              <PortableText value={product.description} />
            </div>
          )}
        </div>
      </div>
      <div className="wrapper">
        <div className="lago-travel-interest-group wrapper">
          <div className="interest-cards-wrapper">
            {cards?.map((card, key) => <TravelInterestCard key={`lago-travel-card-${key}`} {...card} />)}
          </div>
        </div>
        <div className="lago-see-more-articles">
          <div className="travel-guide">{product.travelGuide && <PortableText value={product.travelGuide} />}</div>
          <div className="group">
            {posts?.map((post, key) => (
              <div key={`post-${key}`} className="item">
                <div
                  style={{
                    backgroundImage: `url(${post.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: 'clamp(200px, 20vw, 500px)',
                    borderRadius: '10px',
                  }}
                />
                <div className="excerpt">
                  <h6>{post.excerpt}</h6>
                  <span>{new Date(post.publishedDate || '').toDateString()}</span>
                  <Link key={`post-${key}`} href={`/post/${post.slug?.current}`}>
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DestinationDetailLago;
