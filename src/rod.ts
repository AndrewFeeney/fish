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
  tipPosition: BoardCoordinates
  length: number
  angle: number
  attachedFish?: Fish

  constructor(initialTipPosition: BoardCoordinates = { x: 0, y: 0 }, game: Game) {
    this.tipPosition = initialTipPosition 
    this.length = game.gameConfig.rodInitialLineLength
    this.angle = 90
  }

  hookPosition(): BoardCoordinates {
    return { x: this.tipPosition.x, y: this.tipPosition.y + this.length }
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
    drawLine(ctx, this.tipPosition, this.hookPosition())
    if (this.attachedFish) {
      this.attachedFish.draw(ctx, game)
    }
  }

  attachFish(fish: Fish) {
    this.attachedFish = fish 
  }

  private hasCollidedWithFish(fish: Fish): boolean {
    return distanceBetween(fish.position, this.hookPosition()) <= fish.radius
  }

  private hasFishAttached(): boolean {
    return !!this.attachedFish
  }
}
