import { createTilesFromText } from '../utils.js'
import {
  transrapid,
  nineteenEightyFour,
  jobs,
  schiller,
  africa,
  kennedy,
  reservoirDogs,
  joker,
  monaLisa,
  cheGuevara,
  santa,
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

export const LEVEL_JOBS = {
  name: 'iPhone',
  mode: 'text',
  tiles: createTilesFromText(jobs),
}

export const LEVEL_AN_DIE_FREUDE = {
  name: 'Schiller',
  mode: 'text',
  tiles: createTilesFromText(schiller),
}

export const LEVEL_AFRICA = {
  name: 'Africa',
  mode: 'text',
  tiles: createTilesFromText(africa),
}

export const LEVEL_KENNEDY = {
  name: 'Kennedy',
  mode: 'text',
  tiles: createTilesFromText(kennedy),
}

export const LEVEL_RESERVOIR_DOGS = {
  name: 'Reservoir\n Dogs',
  mode: 'text',
  tiles: createTilesFromText(reservoirDogs),
}

export const LEVEL_JOKER = {
  name: 'Joker',
  mode: 'text',
  tiles: createTilesFromText(joker),
}

export const LEVEL_MONA_LISA = {
  name: 'Mona Lisa',
  mode: 'image',
  tiles: createTilesFromText(monaLisa),
}

export const LEVEL_CHE_GUEVARA = {
  name: 'Che Guevara',
  mode: 'image',
  tiles: createTilesFromText(cheGuevara),
}

export const LEVEL_SANTA = {
  name: 'Santa',
  mode: 'image',
  tiles: createTilesFromText(santa),
}