// src/sanity/env.ts
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-21';

// Studio-specific environment variables
export const studioProjectId = process.env.SANITY_STUDIO_SANITY_PROJECT_ID;
export const studioDataset = process.env.SANITY_STUDIO_SANITY_DATASET;

// Client-side environment variables
export const publicProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const publicDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

// Unified exports that work across contexts
export const projectId = studioProjectId || publicProjectId || '';
export const dataset = studioDataset || publicDataset || 'production';

// Validate environment variables
if (!projectId) {
  throw new Error('Missing projectId');
}
if (!dataset) {
  throw new Error('Missing dataset');
}
