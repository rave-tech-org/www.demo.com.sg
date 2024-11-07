import { ClientPerspective, createClient, QueryParams } from 'next-sanity';
import { projectId, dataset, apiVersion } from './env';

export const token = typeof process === 'undefined' ? '' : process.env.SANITY_API_READ_TOKEN!;

const clientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'development' ? true : false,
  perspective: 'published' as ClientPerspective,
};

export const client = createClient(clientConfig);

export const previewClient = client.withConfig({
  ...clientConfig,
  useCdn: false,
  token,
  perspective: 'previewDrafts',
});

export async function sanityFetch<QueryResponse>({
  query,
  qParams = {},
  tags,
  isDraft = false,
}: {
  query: string;
  qParams?: QueryParams;
  tags: string[];
  isDraft?: boolean;
}): Promise<QueryResponse> {
  if (isDraft && !token) {
    throw new Error('The `SANITY_API_READ_TOKEN` environment variable is required.');
  }
  const currentClient = isDraft ? previewClient : client;
  return currentClient.fetch<QueryResponse>(query, qParams, {
    cache: process.env.NODE_ENV === 'development' ? 'no-store' : 'force-cache',
    next: { tags },
  });
}
