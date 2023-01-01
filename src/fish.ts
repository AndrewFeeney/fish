import { BoardCoordinates } from './board-coordinates'
import { Event } from './events'
import Clock from './clock'
import Drawable from './drawable'
import Game from './game'
import Updatable from './updatable'

function addLeadingZero(hex: string) {
  if (hex.length === 2) {
    return hex
  }

  return `0${hex}`
}

export function getColor(radius: number, maxRadius: number, height: number, maxHeight: number, velocity: number): string {
  const redHex = addLeadingZero(Math.round((radius / maxRadius) * 255).toString(16))
  const greenHex = addLeadingZero(Math.round((height / maxHeight) * 255).toString(16))
  const blueHex = addLeadingZero(Math.round(Math.abs(velocity) * 255).toString(16))

  return `#${redHex}${greenHex}${blueHex}`;
}

export interface Fish extends Updatable, Drawable {
  id: number,
  color: string,
}

export function newFish(game: Game, id: number): Fish {
  const maxRadius = 50
  const radius = Math.round(Math.random() * maxRadius)
  const velocity = Math.random() + Math.random() - 1
  let position: BoardCoordinates = {
    x: Math.round(velocity > 0 ? 0 - radius : game.dimensions.width + radius),
    y: Math.round(Math.random() * 500 + 100),
  }

  const fish = {
    id: id,
    color: getColor(radius, maxRadius, position.y, game.dimensions.height, velocity),
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
      ctx.fillStyle = fish.color
      ctx.beginPath()
      ctx.arc(position.x, position.y, radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    }
  }

  return fish
}
