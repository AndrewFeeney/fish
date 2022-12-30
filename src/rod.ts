import { BoardCoordinates } from './board-coordinates'

export default class Rod {
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
}

