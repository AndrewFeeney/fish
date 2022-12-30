import Drawable from "./drawable";

export default class Fish implements Drawable {
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(75, 75, 50, 0, Math.PI * 2)
    ctx.lineTo(100, 50)
    ctx.fill()
    ctx.stroke()
  }
}
