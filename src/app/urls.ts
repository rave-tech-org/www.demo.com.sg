import type { ReadonlyURLSearchParams } from 'next/navigation';

const addPath = (path: string) => (path === '/' ? '' : path);
const getUrl = ({ path, type = 'production' }: { path: string; type?: keyof typeof BASE_URL }) =>
  `${BASE_URL[type]}${addPath(path)}`;
const isExternalLink = (href: string) => href.startsWith('http');

const getBaseUrl = () => {
  if (IS_CLIENT) return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

const createUrl = (path: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;
  return `${path}${queryString}`;
};

const IS_CLIENT = typeof window !== 'undefined';
const BASE_URL = { development: getBaseUrl(), production: process.env.NEXT_PUBLIC_URL };
const ENDPOINTS = {
  ogImage: '/assets/opengraph.png',
  sitemap: '/sitemap.xml',
};

const PATHS = { main: '/', tours: '/tours' };
const ALL_PATHS = Object.values(PATHS).flat();
const URLS = {
  ogImage: getUrl({ path: ENDPOINTS.ogImage }),
  sitemap: getUrl({ path: ENDPOINTS.sitemap }),
};

const HEADERS = { path: 'path', isDraft: 'isDraft' };

export {
  addPath,
  getBaseUrl,
  getUrl,
  isExternalLink,
  createUrl,
  URLS,
  BASE_URL,
  ENDPOINTS,
  ALL_PATHS,
  PATHS,
  IS_CLIENT,
  HEADERS,
};
