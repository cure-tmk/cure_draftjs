import {
  DraftStyleMap,
} from 'draft-js'
import { RenderConfig } from 'draft-js-export-html'

export const backgroundColorStyleMap: DraftStyleMap = {
  BG_RED: {
    backgroundColor: '#F00',
  },
  BG_GREEN: {
    backgroundColor: '#0F0',
  },
  BG_BLUE: {
    backgroundColor: '#00F',
  },
}

export const backgroundColorRenderConfig: { [styleName: string]: RenderConfig } = Object.keys(
  backgroundColorStyleMap
).reduce(
  (acc, k) => ({
    ...acc,
    [k]: { style: backgroundColorStyleMap[k] },
  }),
  {}
)
