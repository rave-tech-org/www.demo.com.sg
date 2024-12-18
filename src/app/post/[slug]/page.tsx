import AspectRatioImage from '@/elements/aspect-ratio-image';
import ViewIn from '@/elements/view-in';
import { sanityFetch } from '@/sanity/lib/live';
import { GetPostBySlug } from '@/sanity/lib/queries/cms';
import { PortableText } from 'next-sanity';
import { redirect } from 'next/navigation';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: post } = await sanityFetch({ query: GetPostBySlug, params: { slug } });
  if (!post) return redirect('/');

  return (
    <ViewIn variant="slideUp" delay={200}>
      <div className="lago-content-background">
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
