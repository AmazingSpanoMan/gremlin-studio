/*
 * Monochrome 1-bit bitmap helpers matching Gremlin v3 LV_IMG_CF_INDEXED_1BIT layout.
 *
 * Firmware orientation:
 * - Physical Sharp LCD (ls0xx@0) is 160x68 landscape, row-major MSB-first (bit=1 -> black).
 * - Mascot frames are 64x64 aligned at (94, 2).
 * - Because Gremlin v3 mounts the screen vertically (pins at bottom), upright user coordinates
 *   (ux, uy) rotate 90 degrees clockwise into firmware landscape (px, py):
 *     px = fwWidth - 1 - uy
 *     py = ux
 *   where upright dimensions are uWidth = fwHeight, uHeight = fwWidth.
 */

export interface ImageConvertOptions {
  threshold: number;
  dither: boolean;
  invert: boolean;
}

export function uprightDims(fwWidth: number, fwHeight: number): [number, number] {
  return [fwHeight, fwWidth];
}

export function unpackFirmwareToUpright(
  fwBytes: Uint8Array,
  fwWidth: number,
  fwHeight: number
): Uint8Array {
  const [uWidth, uHeight] = uprightDims(fwWidth, fwHeight);
  const pixels = new Uint8Array(uWidth * uHeight);
  const rowBytes = fwWidth >> 3;

  for (let uy = 0; uy < uHeight; uy++) {
    const px = fwWidth - 1 - uy;
    const byteCol = px >> 3;
    const bitMask = 1 << (7 - (px & 7));
    for (let ux = 0; ux < uWidth; ux++) {
      const py = ux;
      const byteVal = fwBytes[py * rowBytes + byteCol] ?? 0;
      pixels[uy * uWidth + ux] = (byteVal & bitMask) !== 0 ? 1 : 0;
    }
  }
  return pixels;
}

export function packUprightToFirmware(
  uprightPixels: Uint8Array,
  fwWidth: number,
  fwHeight: number
): Uint8Array {
  const [uWidth, uHeight] = uprightDims(fwWidth, fwHeight);
  const rowBytes = fwWidth >> 3;
  const fwBytes = new Uint8Array(rowBytes * fwHeight);

  for (let uy = 0; uy < uHeight; uy++) {
    const px = fwWidth - 1 - uy;
    const byteCol = px >> 3;
    const bitMask = 1 << (7 - (px & 7));
    for (let ux = 0; ux < uWidth; ux++) {
      if (uprightPixels[uy * uWidth + ux]) {
        const py = ux;
        fwBytes[py * rowBytes + byteCol] |= bitMask;
      }
    }
  }
  return fwBytes;
}

export function renderUprightPixelsToCanvas(
  ctx: CanvasRenderingContext2D,
  uprightPixels: Uint8Array,
  uWidth: number,
  uHeight: number,
  scale: number,
  showGrid = false
): void {
  const canvasW = uWidth * scale;
  const canvasH = uHeight * scale;
  ctx.fillStyle = "#f4f6f4";
  ctx.fillRect(0, 0, canvasW, canvasH);

  ctx.fillStyle = "#111613";
  for (let y = 0; y < uHeight; y++) {
    const rowOff = y * uWidth;
    for (let x = 0; x < uWidth; x++) {
      if (uprightPixels[rowOff + x]) {
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
  }

  if (showGrid && scale >= 5) {
    ctx.strokeStyle = "rgba(0,0,0,0.12)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= uWidth; x++) {
      ctx.moveTo(x * scale + 0.5, 0);
      ctx.lineTo(x * scale + 0.5, canvasH);
    }
    for (let y = 0; y <= uHeight; y++) {
      ctx.moveTo(0, y * scale + 0.5);
      ctx.lineTo(canvasW, y * scale + 0.5);
    }
    ctx.stroke();
  }
}

export async function imageFileToUprightPixels(
  file: File,
  uWidth: number,
  uHeight: number,
  opts: ImageConvertOptions
): Promise<Uint8Array> {
  const bitmap = await createImageBitmap(file);
  try {
    const canvas = document.createElement("canvas");
    canvas.width = uWidth;
    canvas.height = uHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Could not create 2D canvas context");
    }

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, uWidth, uHeight);

    const scale = Math.min(uWidth / bitmap.width, uHeight / bitmap.height);
    const drawW = Math.round(bitmap.width * scale);
    const drawH = Math.round(bitmap.height * scale);
    const drawX = Math.floor((uWidth - drawW) / 2);
    const drawY = Math.floor((uHeight - drawH) / 2);
    ctx.drawImage(bitmap, drawX, drawY, drawW, drawH);

    const img = ctx.getImageData(0, 0, uWidth, uHeight);
    const lum = new Float32Array(uWidth * uHeight);
    for (let i = 0; i < uWidth * uHeight; i++) {
      const r = img.data[i * 4];
      const g = img.data[i * 4 + 1];
      const b = img.data[i * 4 + 2];
      const a = img.data[i * 4 + 3] / 255;
      const compositedLum = (0.299 * r + 0.587 * g + 0.114 * b) * a + 255 * (1 - a);
      lum[i] = opts.invert ? 255 - compositedLum : compositedLum;
    }

    const out = new Uint8Array(uWidth * uHeight);
    if (!opts.dither) {
      for (let i = 0; i < lum.length; i++) {
        out[i] = lum[i] < opts.threshold ? 1 : 0;
      }
      return out;
    }

    /* Floyd-Steinberg 1-bit error diffusion */
    for (let y = 0; y < uHeight; y++) {
      for (let x = 0; x < uWidth; x++) {
        const idx = y * uWidth + x;
        const oldVal = lum[idx];
        const isBlack = oldVal < opts.threshold;
        out[idx] = isBlack ? 1 : 0;
        const newVal = isBlack ? 0 : 255;
        const err = oldVal - newVal;

        if (x + 1 < uWidth) lum[idx + 1] += err * (7 / 16);
        if (y + 1 < uHeight) {
          if (x > 0) lum[idx + uWidth - 1] += err * (3 / 16);
          lum[idx + uWidth] += err * (5 / 16);
          if (x + 1 < uWidth) lum[idx + uWidth + 1] += err * (1 / 16);
        }
      }
    }

    return out;
  } finally {
    bitmap.close();
  }
}

export function formatCByteArray(bytes: Uint8Array, indent = "    "): string {
  const lines: string[] = [];
  for (let i = 0; i < bytes.length; i += 16) {
    const slice = Array.from(bytes.slice(i, i + 16)).map(
      (b) => `0x${b.toString(16).padStart(2, "0")}`
    );
    lines.push(`${indent}${slice.join(", ")},`);
  }
  return lines.join("\n");
}
