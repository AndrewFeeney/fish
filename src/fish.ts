import Clock from './clock'
import Drawable from './drawable'
import Game from './game'

export default class Fish implements Drawable {
  update(clock: Clock, game: Game) {

  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(75, 75, 50, 0, Math.PI * 2)
    ctx.lineTo(100, 50)
    ctx.fill()
    ctx.stroke()
  }
}
