import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas/user'
import pin from './schemas/pin'
import comment from './schemas/comment'
import postedBy from './schemas/postedBy'
import save from './schemas/save'

export default defineConfig({
  name: 'default',
  title: 'Pinterest',

  projectId: 'c6hb4bn9',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes.concat([pin, comment, postedBy, save]),
  },
})
