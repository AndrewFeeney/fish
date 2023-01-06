import { BoardCoordinates } from './board-coordinates'
import Clock from './clock'
import Drawable from './drawable'
import { drawLine } from './draw'
import { Event } from './events'
import Game from './game'
import Updatable from './updatable'
import { Fish } from './fish'
import { distanceBetween } from './geometry'

export default class Player implements Drawable, Updatable {
  tipPosition: BoardCoordinates
  length: number
  maxLineSpeed: number
  angle: number
  score: number = 0
  attachedFish?: Fish
  lineLengthRateOfChange: number = 0
  lastUpdateTime: number = 0
  game: Game

  constructor(initialTipPosition: BoardCoordinates = { x: 0, y: 0 }, game: Game) {
    this.tipPosition = initialTipPosition 
    this.length = game.gameConfig.rodLineLengthInitial
    this.maxLineSpeed = game.gameConfig.rodLineLineSpeedMaximum
    this.angle = 90
    this.game = game
  }

  boot() {
    this.game.eventBus.on(
      Event.PlayerScoreIncremented,
      (payload: { player: Player, score: number }) => this.incrementScore(payload.score)
    )
  }

  hookPosition(): BoardCoordinates {
    return { x: this.tipPosition.x, y: this.tipPosition.y + this.length }
  }

  update(clock: Clock, game: Game) {
    const updateTime = clock.time()
    const millisecondsSinceLastUpdate = updateTime - this.lastUpdateTime
    this.lastUpdateTime = updateTime
    const minLineLength = game.gameConfig.rodLineLengthMinimum + (this.attachedFish ? this.attachedFish.radius : 0)
    const maxLineLength = game.gameConfig.oceanDepth + game.gameConfig.rodTipHeightAboveWater
    const changeInLineLength = this.lineLengthRateOfChange * millisecondsSinceLastUpdate

    this.length = Math.min(maxLineLength, Math.max(this.length + changeInLineLength, minLineLength))

    if (this.attachedFish) {
      this.attachedFish.position = this.hookPosition()
    }

    if (this.length >= maxLineLength) {
      this.startReelingInLine()
    }

    if (this.length <= minLineLength) {
      this.lineLengthRateOfChange = 0
      if (this.attachedFish) {
        game.eventBus.emit(Event.FishReeledInByPlayer, {
          fish: this.attachedFish,
          player: this
        })
        this.attachedFish = undefined
      }
    }

    if (this.attachedFish) {
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
    this.lineLengthRateOfChange = this.maxLineSpeed
  }

  startReelingInLine() {
    this.lineLengthRateOfChange = 0 - this.maxLineSpeed
  }

  private incrementScore(score: number) {
    this.score = this.score + score
    this.game.eventBus.emit(Event.PlayerScoreUpdated, {
      player: this,
      score: this.score,
      change: score
    })
  }

  private hasCollidedWithFish(fish: Fish): boolean {
    return distanceBetween(fish.position, this.hookPosition()) <= fish.radius
  }
}
