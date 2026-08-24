/**
 * Generate the PNG and ICO favicon derivatives without third-party packages.
 * The vector source remains public/favicon/favicon.svg; generated binaries are
 * intentionally ignored because the review transport only supports text files.
 */
const fs = require('node:fs')
const path = require('node:path')
const zlib = require('node:zlib')

const outputDirectory = path.resolve(__dirname, '../public/favicon')
const pngTargets = [
  ['favicon-16x16.png', 16],
  ['favicon-32x32.png', 32],
  ['apple-touch-icon.png', 180],
  ['android-chrome-192x192.png', 192],
  ['android-chrome-512x512.png', 512],
  ['mstile-150x150.png', 150],
]

const crcTable = Array.from({ length: 256 }, (_, index) => {
  let value = index
  for (let bit = 0; bit < 8; bit += 1) {
    value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1
  }
  return value >>> 0
})

function crc32(buffer) {
  let value = 0xffffffff
  for (const byte of buffer) value = crcTable[(value ^ byte) & 255] ^ (value >>> 8)
  return (value ^ 0xffffffff) >>> 0
}

function pngChunk(type, data) {
  const name = Buffer.from(type)
  const chunk = Buffer.alloc(12 + data.length)
  chunk.writeUInt32BE(data.length)
  name.copy(chunk, 4)
  data.copy(chunk, 8)
  chunk.writeUInt32BE(crc32(Buffer.concat([name, data])), 8 + data.length)
  return chunk
}

function distanceToLine(x, y, start, end) {
  const dx = end[0] - start[0]
  const dy = end[1] - start[1]
  const position = Math.max(0, Math.min(1, ((x - start[0]) * dx + (y - start[1]) * dy) / (dx * dx + dy * dy)))
  return Math.hypot(x - (start[0] + position * dx), y - (start[1] + position * dy))
}

function createPng(size) {
  const scale = size / 64
  const stride = size * 4 + 1
  const pixels = Buffer.alloc(stride * size)
  const shield = [[32, 8], [52, 15], [52, 30], [49, 40], [42, 49], [32, 57], [22, 52], [15, 44], [12, 30], [12, 15], [32, 8]]
    .map((point) => point.map((coordinate) => coordinate * scale))

  function setPixel(x, y, color) {
    const offset = y * stride + 1 + x * 4
    color.forEach((channel, index) => { pixels[offset + index] = channel })
  }

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      setPixel(x, y, [10, 10, 10, 255])
      const isShield = shield.some((point, index) => index > 0 && distanceToLine(x, y, shield[index - 1], point) < 2.6 * scale)
      if (isShield) setPixel(x, y, [240, 45, 79, 255])
      const isX = distanceToLine(x, y, [22 * scale, 20 * scale], [42 * scale, 44 * scale]) < 3.2 * scale
        || distanceToLine(x, y, [42 * scale, 20 * scale], [22 * scale, 44 * scale]) < 3.2 * scale
      if (isX) setPixel(x, y, [245, 245, 245, 255])
    }
  }

  const header = Buffer.alloc(13)
  header.writeUInt32BE(size, 0)
  header.writeUInt32BE(size, 4)
  header[8] = 8
  header[9] = 6
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk('IHDR', header),
    pngChunk('IDAT', zlib.deflateSync(pixels)),
    pngChunk('IEND', Buffer.alloc(0)),
  ])
}

function createIco(images) {
  const directory = Buffer.alloc(6 + images.length * 16)
  directory.writeUInt16LE(1, 2)
  directory.writeUInt16LE(images.length, 4)
  let imageOffset = directory.length

  images.forEach(({ size, buffer }, index) => {
    const offset = 6 + index * 16
    directory[offset] = size
    directory[offset + 1] = size
    directory.writeUInt16LE(1, offset + 4)
    directory.writeUInt16LE(32, offset + 6)
    directory.writeUInt32LE(buffer.length, offset + 8)
    directory.writeUInt32LE(imageOffset, offset + 12)
    imageOffset += buffer.length
  })
  return Buffer.concat([directory, ...images.map(({ buffer }) => buffer)])
}

fs.mkdirSync(outputDirectory, { recursive: true })
const generatedPngs = new Map()
for (const [filename, size] of pngTargets) {
  const png = createPng(size)
  fs.writeFileSync(path.join(outputDirectory, filename), png)
  generatedPngs.set(size, png)
}
const icoImages = [16, 32, 48].map((size) => ({ size, buffer: generatedPngs.get(size) || createPng(size) }))
fs.writeFileSync(path.join(outputDirectory, 'favicon.ico'), createIco(icoImages))
console.log(`Generated ${pngTargets.length} PNG favicons and one multi-size ICO.`)
