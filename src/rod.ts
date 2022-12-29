import BoardCoordinates from './board-coordinates'

export default class Rod {
  anchorPoint: BoardCoordinates
  length: number = 200
  angle: number

  constructor() {
    this.anchorPoint = new BoardCoordinates(10, 10)
    this.angle = 90
  }

  tip(): BoardCoordinates {
    return new BoardCoordinates(this.anchorPoint.x, this.anchorPoint.y + this.length) 
  }
}

