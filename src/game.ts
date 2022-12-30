import { BoardCoordinates } from './board-coordinates'
import { Dimensions2D } from './dimensions-2d'
import Drawable from './drawable'
import Fish from './fish'
import Ocean from './ocean'
import Rod from './rod'
import Updatable from './updatable'

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
  drawables: Array<Drawable>
  updatables: Array<Updatable>

  constructor(dimensions: Dimensions2D) {
    this.dimensions = dimensions

    this.players = [
      new Player({
        x: dimensions.width / 2,
        y: 25,
      }),
    ]

    this.drawables = [
      new Ocean(),
      this.players[0].rod,
      new Fish(),
    ]

    this.updatables = [
      this.players[0].rod,
      new Fish(),
    ]
  }
}
