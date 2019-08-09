import { getRandomColor } from './utils.js'

export const HEADER_HEIGHT = 50

export const GAME_MODE_ARCADE = 'GAME_MODE_ARCADE'
export const GAME_MODE_TIMETRIAL = 'GAME_MODE_TIMETRIAL'
export const GAME_MODE_SURVIVAL = 'GAME_MODE_SURVIVAL'

export let colorsBW = [40, 255, 255, 255, 255]
export let colorsBlue = [200, 0, 0, 0, 0]

export const yellow = [255, 255, 0]
export const magenta = [255, 0, 255]
export const blue = [0, 255, 255]

export const LETTERS = {
  a: { key: 'a', color: color(255, 255, 255) },
  b: { key: 'b', color: color(220, 197, 196) },
  c: { key: 'c', color: color(13, 81, 77) },
  d: { key: 'd', color: color(176, 197, 220) },
  e: { key: 'e', color: color(10, 87, 129) },
  f: { key: 'f', color: color(112, 158, 95) },
  g: { key: 'g', color: color(202, 218, 175) },
  h: { key: 'h', color: color(231, 218, 138) },
  i: { key: 'i', color: color(182, 10, 31) },
  j: { key: 'j', color: color(93, 35, 17) },
  k: { key: 'k', color: color(160, 12, 34) },
  l: { key: 'l', color: color(194, 86, 121) },
  m: { key: 'm', color: color(199, 180, 162) },
  n: { key: 'n', color: color(148, 12, 20) },
  o: { key: 'o', color: color(28, 108, 97) },
  p: { key: 'p', color: color(9, 13, 31) },
  q: { key: 'q', color: color(56, 124, 153) },
  r: { key: 'r', color: color(59, 6, 16) },
  s: { key: 's', color: color(38, 94, 28) },
  t: { key: 't', color: color(244, 195, 45) },
  u: { key: 'u', color: color(218, 37, 27) },
  v: { key: 'v', color: color(105, 44, 20) },
  w: { key: 'w', color: color(209, 160, 140) },
  x: { key: 'x', color: color(206, 124, 151) },
  y: { key: 'y', color: color(165, 70, 127) },
  z: { key: 'z', color: color(200, 151, 83) },
  ' ': { key: ' ', keyText: '·', color: color(0, 0, 0) },
}
