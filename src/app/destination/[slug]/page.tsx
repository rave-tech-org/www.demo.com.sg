export default async function DestinationPage({ params }: { params: { slug: string } }) {
  const slug = params?.slug as string;
  return (
    <div className="wrapper">
      <h1>Coming soon...</h1>
      <h2>{slug} destination</h2>
    </div>
  );
}
