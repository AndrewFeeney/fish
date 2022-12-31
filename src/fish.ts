import { BoardCoordinates } from './board-coordinates'
import { Event } from './events'
import Clock from './clock'
import Drawable from './drawable'
import Game from './game'

export default class Fish implements Drawable {
  id: number
  position?: BoardCoordinates
  radius: number
  velocity: number

  constructor(id: number) {
    this.id = id
    this.radius = Math.round(Math.random() * 50)
    this.velocity = Math.random() * 2 - 1
  }

  update(clock: Clock, game: Game) {
    if (!this.position) {
      this.position = {
        x: Math.round(this.velocity > 0 ? 0 - this.radius : game.dimensions.width + this.radius),
        y: Math.round(Math.random() * 500 + 100),
      }
    }

    this.position = {
      x: this.position.x + (clock.time() / 2500) * this.velocity,
      y: this.position.y
    }

    if (this.position.x < 0 - 2 * this.radius) {
      game.eventBus.emit(Event.FishOutOfBounds, this)
    }
    if (this.position.x > game.dimensions.width + 2 * this.radius) {
      game.eventBus.emit(Event.FishOutOfBounds, this)
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.position) {
      return
    }

    ctx.fillStyle = "#990000";
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
  }
}
