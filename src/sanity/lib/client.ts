import { ClientPerspective, createClient, QueryParams } from 'next-sanity';
import { projectId, dataset, apiVersion } from './env';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

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

type SanityFetchProps = {
  query: string;
  qParams?: QueryParams;
  tags: string[];
  isDraft?: boolean;
};

export async function sanityFetch<QueryResponse>({
  query,
  qParams = {},
  tags,
  isDraft = true,
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
  console.log(isDraft, currentClient, '===');
  return currentClient.fetch<QueryResponse>(query, qParams, {
    cache: process.env.NODE_ENV === 'development' && isDraft ? 'no-store' : 'force-cache',
    next: { tags },
  });
}

// If array exists (more than 1), set isDraft true
// And do this to get data  isDraft ? [1] : [0]

export function useSanityQuery<QueryResponse>({
  query,
  tags,
  qParams = {},
  isDraft = false,
  options,
}: SanityFetchProps & { options?: UseQueryOptions<QueryResponse, Error> }): UseQueryResult<QueryResponse, Error> {
  return useQuery<QueryResponse, Error>({
    queryKey: [...tags, { isDraft }],
    queryFn: () => sanityFetch<QueryResponse>({ query, qParams, tags, isDraft }),
    ...options,
  });
}
