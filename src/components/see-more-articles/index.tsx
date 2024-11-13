import Link from 'next/link';
import { CustomSeeMoreAttributes, PostType } from './type';
import ViewIn from '@/elements/view-in';
import { PortableText } from 'next-sanity';
import { sanityFetch } from '@/sanity/lib/client';
import { GET_POSTS } from '@/sanity/lib/queries/cms';
import { ContentBlock } from '@/sanity/sanity.types';
import { transformObject } from '@/utils';

const SeeMoreArticles = async ({ block }: { block: ContentBlock }) => {
  const { description, customAttributes } = block;
  const posts = await sanityFetch<PostType[]>({
    query: GET_POSTS,
    tags: ['post'],
  });
  const custom = transformObject<CustomSeeMoreAttributes>(customAttributes);
  const buttons = Object.keys(custom).map((key) => ({
    key,
    label: key.replaceAll('-', ' ').toUpperCase(),
    value: custom?.[key as keyof CustomSeeMoreAttributes],
  }));
  const seeMoreButton = buttons.find((button) => button.key === 'see-more-articles');
  return (
    <ViewIn variant="slideUp" delay={200}>
      <div className="wrapper">
        <div className="lago-see-more-articles">
          {description && <PortableText value={description} />}
          <div className="group">
            {posts.map((post, key) => (
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

          <div className="button-wrapper">
            <button className="primary-button outline">
              <p>{seeMoreButton?.label}</p>
            </button>
          </div>
        </div>
      </div>
    </ViewIn>
  );
};

export default SeeMoreArticles;
