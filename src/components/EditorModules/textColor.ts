import {
  DraftStyleMap,
} from 'draft-js'
import { RenderConfig } from 'draft-js-export-html'

export const textColorStyleMap: DraftStyleMap = {
  RED: {
    color: '#F00',
  },
  GREEN: {
    color: '#0F0',
  },
  BLUE: {
    color: '#00F',
  },
}

export const textColorRenderConfig: { [styleName: string]: RenderConfig } = Object.keys(
  textColorStyleMap
).reduce(
  (acc, k) => ({
    ...acc,
    [k]: { style: textColorStyleMap[k] },
  }),
  {}
)
