export function createGradient(
  ctx: CanvasRenderingContext2D, 
  colorStart: string, 
  colorEnd: string,
  colorMid?: string
) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);

  gradient.addColorStop(0, colorStart);
  colorMid && gradient.addColorStop(0.5, colorMid);
  gradient.addColorStop(1, colorEnd);

  return gradient;
}