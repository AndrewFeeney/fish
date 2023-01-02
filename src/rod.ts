import { BoardCoordinates } from './board-coordinates'
import Clock from './clock'
import Drawable from './drawable'
import { drawLine } from './draw'
import { Event } from './events'
import Game from './game'
import Updatable from './updatable'
import { Fish } from './fish'
import { distanceBetween } from './geometry'

export default class Rod implements Drawable, Updatable {
  anchorPoint: BoardCoordinates
  length: number = 100
  swingWidth: number = 50
  angle: number
  attachedFish?: Fish

  constructor(initialAnchorPoint: BoardCoordinates = { x: 0, y: 0 }) {
    this.anchorPoint = initialAnchorPoint 
    this.angle = 90
  }

  tip(): BoardCoordinates {
    return { x: this.anchorPoint.x, y: this.anchorPoint.y + this.length } 
  }

  update(_clock: Clock, game: Game) {
    if (this.hasFishAttached()) {
      return
    }

    game.fish.forEach((fish) => {
      if (this.hasCollidedWithFish(fish)) {
        game.eventBus.emit(Event.FishCollidedWithRod, {
          fish: fish,
          rod: this,
        })
      }
    })
  }

  draw(ctx: CanvasRenderingContext2D, game: Game) {
    drawLine(ctx, this.anchorPoint, this.tip())
    if (this.attachedFish) {
      this.attachedFish.draw(ctx, game)
    }
  }

  attachFish(fish: Fish) {
    this.attachedFish = fish 
  }

  private hasCollidedWithFish(fish: Fish): boolean {
    return distanceBetween(fish.position, this.tip()) <= fish.radius
  }

  private hasFishAttached(): boolean {
    return !!this.attachedFish
  }
}
