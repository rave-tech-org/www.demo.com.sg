import { getMetadata } from '@/app/metadata';
import AspectRatioImage from '@/elements/aspect-ratio-image';
import ViewIn from '@/elements/view-in';
import { sanityFetch } from '@/sanity/lib/live';
import { GetPostBySlug } from '@/sanity/lib/queries/cms';
import { TAG } from '@/sanity/lib/tag';
import type { Metadata } from 'next';
import { PortableText } from 'next-sanity';
import { redirect } from 'next/navigation';

type Props = { params: Promise<{ slug: string }> };

const getData = async (slug: string) => {
  const { data } = await sanityFetch({
    query: GetPostBySlug,
    params: { slug },
    tag: TAG.post,
  });

  return data;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getData(slug);

  return getMetadata({
    imageUrl: post?.imageUrl,
    title: post?.title,
    description: post?.excerpt,
    keywords: post?.tags,
    openGraphArticle: {
      publishedTime: post?.publishedDate ?? new Date().toISOString(),
      modifiedTime: post?.publishedDate ?? new Date().toISOString(),
    },
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getData(slug);
  if (!post) return redirect('/');

  return (
    <ViewIn variant="slideUp" delay={200}>
      <div className="demo-content-background">
        {post.imageUrl ? (
          <AspectRatioImage
            src={post.imageUrl ?? ''}
            alt={post.title || ''}
            aspectRatio="2/1"
            hasBlackOpacityBackground
            priority
          />
        ) : null}
        <div className="content">
          <h3>{post.title}</h3>
        </div>
      </div>
      <div className="wrapper">
        <h2>{post.title}</h2>
        {post.content && <PortableText value={post.content} />}
      </div>
    </ViewIn>
  );
}
