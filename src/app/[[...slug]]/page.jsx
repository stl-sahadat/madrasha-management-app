import ClientApp from '@/components/ClientApp';

export default async function CatchAllPage({ params }) {
  const resolved = params ? await params : {};
  return <ClientApp initialSlug={resolved.slug} />;
}
