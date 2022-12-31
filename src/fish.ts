import { BoardCoordinates } from './board-coordinates'
import { Event } from './events'
import Clock from './clock'
import Drawable from './drawable'
import Game from './game'
import Updatable from './updatable'

function getColor(radius: number, maxRadius: number, height: number, maxHeight: number, velocity: number): string {
  const redHex = Math.round((radius / maxRadius) * 256).toString(16)
  const greenHex = Math.round((height / maxHeight) * 256).toString(16)
  const blueHex = Math.round(Math.abs(velocity) * 256).toString(16)

  return `#${redHex}${greenHex}${blueHex}`;
}

export interface Fish extends Updatable, Drawable {
  id: number,
}

export function newFish(game: Game, id: number): Fish {
  const maxRadius = 50
  const radius = Math.round(Math.random() * maxRadius)
  const velocity = Math.random() + Math.random() - 1
  let position: BoardCoordinates = {
    x: Math.round(velocity > 0 ? 0 - radius : game.dimensions.width + radius),
    y: Math.round(Math.random() * 500 + 100),
  }
  const color = getColor(radius, maxRadius, position.y, game.dimensions.height, velocity)

  const fish = {
    id: id,
    update: (clock: Clock, game: Game) => {
      position = {
        x: position.x + (clock.time() / 2500) * velocity,
        y: position.y
      }

      if (position.x < 0 - 2 * radius) {
        game.eventBus.emit(Event.FishOutOfBounds, fish)
      }
      if (position.x > game.dimensions.width + 2 * radius) {
        game.eventBus.emit(Event.FishOutOfBounds, fish)
      }
    },

    draw: (ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(position.x, position.y, radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    }
  }

  return fish
}
