import { getRandomColor } from './utils.js'

export const HEADER_HEIGHT = 50

export const GAME_MODE_ARCADE = 'GAME_MODE_ARCADE'
export const GAME_MODE_TIMETRIAL = 'GAME_MODE_TIMETRIAL'
export const GAME_MODE_SURVIVAL = 'GAME_MODE_SURVIVAL'

export let colorsBW = [40, 255, 255, 255, 255]
export let colorsBlue = [200, 0, 0, 0, 0]

export const LETTERS = {
  a: { key: 'a', color: getRandomColor() },
  b: { key: 'b', color: getRandomColor() },
  c: { key: 'c', color: getRandomColor() },
  d: { key: 'd', color: getRandomColor() },
  e: { key: 'e', color: getRandomColor() },
  f: { key: 'f', color: getRandomColor() },
  g: { key: 'g', color: getRandomColor() },
  h: { key: 'h', color: getRandomColor() },
  i: { key: 'i', color: getRandomColor() },
  j: { key: 'j', color: getRandomColor() },
  k: { key: 'k', color: getRandomColor() },
  l: { key: 'l', color: getRandomColor() },
  m: { key: 'm', color: getRandomColor() },
  n: { key: 'n', color: getRandomColor() },
  o: { key: 'o', color: getRandomColor() },
  p: { key: 'p', color: getRandomColor() },
  q: { key: 'q', color: getRandomColor() },
  r: { key: 'r', color: getRandomColor() },
  s: { key: 's', color: getRandomColor() },
  t: { key: 't', color: getRandomColor() },
  u: { key: 'u', color: getRandomColor() },
  v: { key: 'v', color: getRandomColor() },
  w: { key: 'w', color: getRandomColor() },
  x: { key: 'x', color: getRandomColor() },
  y: { key: 'y', color: getRandomColor() },
  z: { key: 'z', color: getRandomColor() },
  ' ': { key: ' ', keyText: '·', color: getRandomColor() },
}
