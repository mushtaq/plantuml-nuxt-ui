import pako from 'pako'

// PlantUML specific encoding table
const encode6bit = (b: number) => {
  if (b < 10) return String.fromCharCode(48 + b)
  b -= 10
  if (b < 26) return String.fromCharCode(65 + b)
  b -= 26
  if (b < 26) return String.fromCharCode(97 + b)
  b -= 26
  if (b === 0) return '-'
  if (b === 1) return '_'
  return '?'
}

const append3bytes = (b1: number, b2: number, b3: number) => {
  const c1 = b1 >> 2
  const c2 = ((b1 & 0x3) << 4) | (b2 >> 4)
  const c3 = ((b2 & 0xF) << 2) | (b3 >> 6)
  const c4 = b3 & 0x3F
  let res = ''
  res += encode6bit(c1 & 0x3F)
  res += encode6bit(c2 & 0x3F)
  res += encode6bit(c3 & 0x3F)
  res += encode6bit(c4 & 0x3F)
  return res
}

export function encode(source: string): string {
  let compressed = pako.deflate(source, { level: 9 })
  let result = ''
  
  // Process all bytes
  for (let i = 0; i < compressed.length; i += 3) {
    if (i + 2 === compressed.length) {
      result += append3bytes(compressed[i], compressed[i + 1], 0)
    } else if (i + 1 === compressed.length) {
      result += append3bytes(compressed[i], 0, 0)
    } else {
      result += append3bytes(compressed[i], compressed[i + 1], compressed[i + 2])
    }
  }
  
  return result
}
