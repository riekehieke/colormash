import { createTilesFromText } from '../utils.js'
import * as texts from './texts.js'

/*
 Erstellen von Level-Objekten basierend auf den Strings aus texts.js
*/

export const LEVEL_TRANSRAPID = {
  name: 'Transrapid',
  mode: 'text',
  tiles: createTilesFromText(texts.transrapid),
}

export const LEVEL_1984 = {
  name: '1984',
  mode: 'text',
  tiles: createTilesFromText(texts.nineteenEightyFour),
}

export const LEVEL_JOBS = {
  name: 'iPhone',
  mode: 'text',
  tiles: createTilesFromText(texts.jobs),
}

export const LEVEL_AN_DIE_FREUDE = {
  name: 'Schiller',
  mode: 'text',
  tiles: createTilesFromText(texts.schiller),
}

export const LEVEL_AFRICA = {
  name: 'Africa',
  mode: 'text',
  tiles: createTilesFromText(texts.africa),
}

export const LEVEL_KENNEDY = {
  name: 'Kennedy',
  mode: 'text',
  tiles: createTilesFromText(texts.kennedy),
}

export const LEVEL_RESERVOIR_DOGS = {
  name: 'Reservoir\n Dogs',
  mode: 'text',
  tiles: createTilesFromText(texts.reservoirDogs),
}

export const LEVEL_JOKER = {
  name: 'Joker',
  mode: 'text',
  tiles: createTilesFromText(texts.joker),
}

export const LEVEL_MONA_LISA = {
  name: 'Mona Lisa',
  mode: 'image',
  tiles: createTilesFromText(texts.monaLisa),
}

export const LEVEL_CHE_GUEVARA = {
  name: 'Che Guevara',
  mode: 'image',
  tiles: createTilesFromText(texts.cheGuevara),
}

export const LEVEL_SANTA = {
  name: 'Santa',
  mode: 'image',
  tiles: createTilesFromText(texts.santa),
}

export const LEVEL_MARILYN_MONROE = {
  name: 'Marilyn Monroe',
  mode: 'image',
  tiles: createTilesFromText(texts.marilynMonroe),
}

export const LEVEL_ELEPHANT = {
  name: 'Elephant',
  mode: 'image',
  tiles: createTilesFromText(texts.elephant),
}

export const LEVEL_EMOJI = {
  name: 'Emoji',
  mode: 'image',
  tiles: createTilesFromText(texts.emoji),
}

export const LEVEL_RUBIX_CUBE = {
  name: 'Rubix Cube',
  mode: 'image',
  tiles: createTilesFromText(texts.rubixCube),
}

export const LEVEL_DONALD_TRUMP = {
  name: 'Donald Trump',
  mode: 'image',
  tiles: createTilesFromText(texts.donaldTrump),
}
