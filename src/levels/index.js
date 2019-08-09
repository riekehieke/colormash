import { createTilesFromText } from '../utils.js'
import {
  transrapid,
  nineteenEightyFour,
  abschied,
  schiller,
  monaLisa,
} from './texts.js'

export const LEVEL_TRANSRAPID = {
  name: 'Transrapid',
  mode: 'text',
  tiles: createTilesFromText(transrapid),
}

export const LEVEL_1984 = {
  name: '1984',
  mode: 'text',
  tiles: createTilesFromText(nineteenEightyFour),
}

export const LEVEL_ABSCHIED = {
  name: 'Abschied',
  mode: 'text',
  tiles: createTilesFromText(abschied),
}

export const LEVEL_AN_DIE_FREUDE = {
  name: 'Schiller',
  mode: 'text',
  tiles: createTilesFromText(schiller),
}

export const LEVEL_MONA_LISA = {
  name: 'Mona Lisa',
  mode: 'image',
  tiles: createTilesFromText(monaLisa),
}
