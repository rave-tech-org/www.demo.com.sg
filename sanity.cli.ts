import { defineCliConfig } from 'sanity/cli'
import { dataset, projectId } from './src/sanity/env'
import * as dotenv from 'dotenv'
dotenv.config()

export default defineCliConfig({
  api: { projectId, dataset },
})