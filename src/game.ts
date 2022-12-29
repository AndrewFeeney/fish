import Coordinates from "./coordinates"

class BoardCoordinates implements Coordinates {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

class Rod {
  anchorPoint: BoardCoordinates
  length: number = 200
  angle: number

  constructor() {
    this.anchorPoint = new BoardCoordinates(10, 10)
    this.angle = 90
  }

  tip(): Coordinates {
    return new BoardCoordinates(this.anchorPoint.x, this.anchorPoint.y + this.length) 
  }
}

class Player {
  rod: Rod
  constructor() {
    this.rod = new Rod
  }
}

export default class Game {
  players: Array<Player>
  constructor() {
    this.players = [new Player()]
  }
}
