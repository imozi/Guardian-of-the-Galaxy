export const rotateObject = (
  ctx: CanvasRenderingContext2D,
  angle: number,
  x: number,
  y: number
) => {
  ctx.translate(x, y)
  ctx.rotate((Math.PI / 180) * angle)
  ctx.translate(-x, -y)
}
