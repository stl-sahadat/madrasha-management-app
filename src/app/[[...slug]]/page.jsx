import ClientApp from '@/components/ClientApp';

export default async function CatchAllPage({ params, searchParams }) {
  const resolvedParams = params ? await params : {};
  const resolvedSearchParams = searchParams ? await searchParams : {};
  return <ClientApp initialSlug={resolvedParams.slug} initialSearchParams={resolvedSearchParams} />;
}
