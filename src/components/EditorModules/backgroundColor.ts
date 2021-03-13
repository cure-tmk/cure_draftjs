import {
  DraftStyleMap,
} from 'draft-js'
import { RenderConfig } from 'draft-js-export-html'

export const commands = {
  BG_RED: 'BG_RED',
  BG_GREEN: 'BG_GREEN',
  BG_BLUE: 'BG_BLUE'
}

export const backgroundColorStyleMap: DraftStyleMap = {
  [commands.BG_RED]: {
    backgroundColor: '#F00',
  },
  [commands.BG_GREEN]: {
    backgroundColor: '#0F0',
  },
  [commands.BG_BLUE]: {
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
