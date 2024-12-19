import { defaultDocumentNode } from '@/sanity/components/default-document-node';
import { resolve } from '@/sanity/presentation/resolve';
import { structure } from '@/sanity/structure';
import CustomNavBar from '@/sanity/structure/custom-nav-bar';
import CustomToolMenu from '@/sanity/structure/custom-tool-menu';
import { RocketIcon } from '@sanity/icons';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { media } from 'sanity-plugin-media';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import { apiVersion, dataset, projectId } from './src/sanity/lib/env';
import { schemaTypes } from './src/sanity/schema-types';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({ structure, defaultDocumentNode }),
    visionTool({ defaultApiVersion: apiVersion }),
    media(),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
    }),
  ],
  studio: {
    components: {
      navbar: CustomNavBar,
      toolMenu: CustomToolMenu,
    },
  },
  icon: RocketIcon,
  title: 'Demo Travel Studio',
  name: 'demo-travel-studio',
});
