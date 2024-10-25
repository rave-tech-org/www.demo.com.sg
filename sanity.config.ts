/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion } from './src/sanity/env';
import { schemaTypes } from './src/sanity/schemaTypes';
import { structure } from './src/sanity/structure';

console.log('Sanity config Project ID:', process.env.SANITY_STUDIO_SANITY_PROJECT_ID);
console.log('Sanity config Dataset:', process.env.SANITY_STUDIO_SANITY_DATASET);

export default defineConfig({
  basePath: '/studio',
  projectId: 'oytcbhek',
  dataset: 'production',
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
