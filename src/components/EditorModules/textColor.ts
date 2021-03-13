import {
  DraftStyleMap,
} from 'draft-js'
import { RenderConfig } from 'draft-js-export-html'

export const commands = {
  RED: 'RED',
  GREEN: 'GREEN',
  BLUE: 'BLUE'
}

export const textColorStyleMap: DraftStyleMap = {
  [commands.RED]: {
    color: '#F00',
  },
  [commands.GREEN]: {
    color: '#0F0',
  },
  [commands.BLUE]: {
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
