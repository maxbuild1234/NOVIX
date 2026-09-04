/**
 * The accent ramp: white, holding, then falling to violet and purple.
 * Matches the stops in the `.text-edge` CSS utility.
 *
 * Why this exists: an animated character sets `transform`, which creates
 * a stacking context, which stops a parent's `background-clip: text`
 * gradient from painting through it. Colouring each character directly
 * gives the same read and survives the animation.
 */
const WHITE = [255, 255, 255] as const;
const VIOLET = [168, 85, 247] as const;
const PURPLE = [124, 58, 237] as const;

function mix(a: readonly number[], b: readonly number[], t: number) {
  const channel = (i: number) => Math.round(a[i] + (b[i] - a[i]) * t);
  return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`;
}

/**
 * @param t position along the line, 0 to 1.
 * Purple lands only on the last few glyphs, which are display-sized, so
 * its 3.58:1 on black is comfortably inside the large-text AA threshold.
 */
export function accentColorAt(t: number): string {
  if (t <= 0.32) return "rgb(255, 255, 255)";
  if (t <= 0.78) return mix(WHITE, VIOLET, (t - 0.32) / 0.46);
  return mix(VIOLET, PURPLE, (t - 0.78) / 0.22);
}
