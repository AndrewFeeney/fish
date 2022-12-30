import {BoardCoordinates} from './board-coordinates'
import Clock from './clock'
import Drawable from './drawable'
import Game from './game'

export default class Fish implements Drawable {
  position: BoardCoordinates
  radius = 50

  constructor() {
    this.position = {
      x: 75,
      y: 75,
    }
  }

  update(clock: Clock, game: Game) {
    this.position = {
      x: this.position.x + clock.time() / 10000,
      y: this.position.y
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
  }
}
