import Rod from "./rod"

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
