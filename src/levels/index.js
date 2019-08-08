import { createTilesFromText } from '../utils.js'
import {
  textTransrapid,
  text1984,
  textAbschied,
  textAnDieFreude,
} from './texts.js'

export const LEVEL_TRANSRAPID = {
  name: 'Transrapid',
  mode: 'text',
  tiles: createTilesFromText(textTransrapid),
}

export const LEVEL_1984 = {
  name: '1984',
  mode: 'text',
  tiles: createTilesFromText(text1984),
}

export const LEVEL_ABSCHIED = {
  name: 'Abschied',
  mode: 'text',
  tiles: createTilesFromText(textAbschied),
}

export const LEVEL_AN_DIE_FREUDE = {
  name: 'Schiller',
  mode: 'text',
  tiles: createTilesFromText(textAnDieFreude),
}

// ! Temporäre level zu Test-Zwecken:
export const TEMP_FOO = LEVEL_1984
export const TEMP_BAR = LEVEL_AN_DIE_FREUDE
export const TEMP_IMAGE_EXAMPLE = {
  name: 'Image Example',
  mode: 'image',
  tiles: createTilesFromText(textAbschied),
}
