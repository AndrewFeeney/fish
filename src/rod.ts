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
  lineLengthRateOfChange: number = 0

  constructor(initialTipPosition: BoardCoordinates = { x: 0, y: 0 }, game: Game) {
    this.tipPosition = initialTipPosition 
    this.length = game.gameConfig.rodLineLengthInitial
    this.angle = 90
  }

  hookPosition(): BoardCoordinates {
    return { x: this.tipPosition.x, y: this.tipPosition.y + this.length }
  }

  update(_clock: Clock, game: Game) {
    const minLineLength = game.gameConfig.rodLineLengthMinimum + (this.attachedFish ? this.attachedFish.radius : 0)
    const maxLineLength = game.gameConfig.oceanDepth + game.gameConfig.rodTipHeightAboveWater

    this.length = Math.min(maxLineLength, Math.max(this.length + this.lineLengthRateOfChange, minLineLength))

    if (this.length === maxLineLength) {
      this.startReelingInLine()
    }

    if (this.length === minLineLength) {
      this.lineLengthRateOfChange = 0
    }

    if (this.attachedFish) {
      this.attachedFish.position = this.hookPosition()
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

  startLettingOutLine() {
    this.lineLengthRateOfChange = 1
  }

  startReelingInLine() {
    this.lineLengthRateOfChange = -1
  }

  private hasCollidedWithFish(fish: Fish): boolean {
    return distanceBetween(fish.position, this.hookPosition()) <= fish.radius
  }
}
