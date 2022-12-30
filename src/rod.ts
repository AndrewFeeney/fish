import { BoardCoordinates } from './board-coordinates'
import Drawable from './drawable'
import Game from './game'
import { drawLine } from './draw'

export default class Rod implements Drawable {
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

  draw(ctx: CanvasRenderingContext2D, _game: Game) {
    drawLine(ctx, this.anchorPoint, this.tip())
  }
}

