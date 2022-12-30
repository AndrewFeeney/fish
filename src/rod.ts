import { BoardCoordinates } from './board-coordinates'
import Clock from './clock'
import Drawable from './drawable'
import { drawLine } from './draw'
import Game from './game'
import Updatable from './updatable'

export default class Rod implements Drawable, Updatable {
  anchorPoint: BoardCoordinates
  length: number = 100
  swingWidth: number = 50
  angle: number

  constructor(initialAnchorPoint: BoardCoordinates = { x: 0, y: 0 }) {
    this.anchorPoint = initialAnchorPoint 
    this.angle = 90
  }

  tip(): BoardCoordinates {
    return { x: this.anchorPoint.x, y: this.anchorPoint.y + this.length } 
  }

  update(clock: Clock, game: Game) {

  }

  draw(ctx: CanvasRenderingContext2D, _game: Game) {
    drawLine(ctx, this.anchorPoint, this.tip())
  }
}

