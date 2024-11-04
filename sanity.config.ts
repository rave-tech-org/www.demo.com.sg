import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from './src/sanity/lib/env'
import { schemaTypes } from './src/sanity/schema-types'
import { structure } from './src/sanity/structure'
import { defaultDocumentNode } from '@/sanity/components/default-document-node'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({ defaultDocumentNode }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})