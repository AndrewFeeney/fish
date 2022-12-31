import { BoardCoordinates } from './board-coordinates'
import { Event } from './events'
import Clock from './clock'
import Drawable from './drawable'
import Game from './game'

export default class Fish implements Drawable {
  id: number
  position: BoardCoordinates
  radius: number
  velocity: number

  constructor(id: number) {
    this.id = id
    this.radius = Math.round(Math.random() * 50)

    this.velocity = Math.random() * 2 - 1

    this.position = {
      x: Math.round(Math.random() * 500),
      y: Math.round(Math.random() * 500 + 100),
    }
  }

  update(clock: Clock, game: Game) {
    this.position = {
      x: this.position.x + (clock.time() / 2500) * this.velocity,
      y: this.position.y
    }

    if (this.position.x < 0 - this.radius) {
      game.eventBus.emit(Event.FishOutOfBounds, this)
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#990000";
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
  }
}
