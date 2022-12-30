import { BoardCoordinates } from './board-coordinates'
import { Dimensions2D } from './dimensions-2d'
import Rod from "./rod"

class Player {
  rod: Rod
  initialAnchorPoint: BoardCoordinates

  constructor(initialAnchorPoint: BoardCoordinates) {
    this.initialAnchorPoint = initialAnchorPoint
    this.rod = new Rod(this.initialAnchorPoint)
  }
}

export default class Game {
  players: Array<Player>
  dimensions: Dimensions2D

  constructor(dimensions: Dimensions2D) {
    this.dimensions = dimensions
    this.players = [
      new Player({
        x: dimensions.width / 2,
        y: 25,
      }),
    ]
  }
}
