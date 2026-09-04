/**
 * Generates the placeholder imagery in /public/work and /public/og.png.
 *
 * Run with:  node scripts/generate-placeholders.mjs
 *
 * These are stand-ins. Replace them with real screenshots or photography
 * and keep the same filenames, or update the paths in src/content/projects.ts.
 * Dimensions must match the width/height recorded there, otherwise next/image
 * will reserve the wrong space and the page will shift on load.
 *
 * Written with only node builtins (zlib + a small CRC) so the repo does not
 * carry an image library it never uses at runtime.
 */
import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const workDir = join(root, "public", "work");
mkdirSync(workDir, { recursive: true });

/* ---------- minimal PNG encoder ---------- */

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i += 1) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeAndData = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([len, typeAndData, crc]);
}

function encodePng(width, height, rgb) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // colour type: truecolour
  // 10..12 stay zero: deflate, adaptive filtering, no interlace

  // One filter byte (0 = None) in front of every scanline.
  const stride = width * 3;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * (stride + 1)] = 0;
    rgb.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* ---------- composition ---------- */

const BLACK = [5, 5, 5];
const INK = [15, 15, 17];
const GRAY_1 = [28, 28, 32];
const PURPLE = [124, 58, 237];
const VIOLET = [168, 85, 247];

const clamp = (v) => (v < 0 ? 0 : v > 255 ? 255 : v | 0);
const lerp = (a, b, t) => a + (b - a) * t;
const mix = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];

/** Deterministic per-file variation, so re-running produces identical files. */
function seedFrom(name) {
  let h = 2166136261;
  for (let i = 0; i < name.length; i += 1) {
    h ^= name.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

function render(width, height, seed) {
  const rgb = Buffer.alloc(width * height * 3);

  // One accent bloom per image, positioned by the seed.
  const glowX = width * (0.18 + seed * 0.64);
  const glowY = height * (0.22 + ((seed * 7.3) % 1) * 0.56);
  const glowR = Math.min(width, height) * (0.45 + ((seed * 3.1) % 1) * 0.3);
  const accent = seed > 0.5 ? VIOLET : PURPLE;
  const bandCount = 3 + Math.floor(((seed * 11.7) % 1) * 3);
  const angle = -0.35 + ((seed * 5.9) % 1) * 0.7;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      // Base: a diagonal wash from black up to ink.
      const d = (x / width) * Math.cos(angle) + (y / height) * Math.sin(angle);
      let color = mix(BLACK, INK, Math.min(1, Math.max(0, d * 0.9 + 0.15)));

      // Bands of slightly lighter gray, softened at their edges.
      const bandPos = ((y / height) * bandCount + seed * 3) % 1;
      const bandEdge = Math.abs(bandPos - 0.5) * 2;
      if (bandEdge > 0.72) {
        color = mix(color, GRAY_1, (bandEdge - 0.72) / 0.28 * 0.5);
      }

      // The accent bloom, kept low so it never washes the frame.
      const dx = x - glowX;
      const dy = y - glowY;
      const dist = Math.sqrt(dx * dx + dy * dy) / glowR;
      if (dist < 1) {
        const falloff = (1 - dist) ** 2.4;
        color = mix(color, accent, falloff * 0.22);
      }

      // Ordered dither, which keeps the wide gradients from banding.
      const dither = (((x * 7 + y * 13) % 5) - 2) * 0.4;

      const i = (y * width + x) * 3;
      rgb[i] = clamp(color[0] + dither);
      rgb[i + 1] = clamp(color[1] + dither);
      rgb[i + 2] = clamp(color[2] + dither);
    }
  }

  return rgb;
}

function write(file, width, height) {
  const seed = seedFrom(file);
  const png = encodePng(width, height, render(width, height, seed));
  writeFileSync(file, png);
  return png.length;
}

/* ---------- targets ---------- */

const slugs = [
  "casa-marisol",
  "boca-catalina-dive",
  "ferreteria-san-nicolas",
  "sabor-criollo",
  "palm-ridge-dental",
  "isla-cargo",
];

let total = 0;
for (const slug of slugs) {
  total += write(join(workDir, `${slug}-cover.png`), 1200, 900);
  total += write(join(workDir, `${slug}-01.png`), 1600, 1000);
  total += write(join(workDir, `${slug}-02.png`), 1600, 1000);
}
total += write(join(root, "public", "og.png"), 1200, 630);

console.log(`Wrote ${slugs.length * 3 + 1} images, ${(total / 1024 / 1024).toFixed(2)} MB total.`);
