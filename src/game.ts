import { BoardCoordinates } from './board-coordinates'
import Clock from './clock'
import { gameEventBus, EventBus, Event} from './events'
import { newFish, Fish } from './fish'
import GameClock from './game-clock'
import { GameConfig } from './game-config'
import Ocean from './ocean'
import Rod from './rod'

class Player {
  rod: Rod
  initialRodPosition: BoardCoordinates

  constructor(initialRodPosition: BoardCoordinates, game: Game) {
    this.initialRodPosition = initialRodPosition
    this.rod = new Rod(this.initialRodPosition, game)
  }
}

export default class Game {
  ctx: CanvasRenderingContext2D
  gameConfig: GameConfig
  clock: Clock
  eventBus: EventBus

  players: Array<Player>
  fish: Array<Fish> = []
  ocean: Ocean
  nextFishId: number

  constructor(ctx: CanvasRenderingContext2D, gameConfig: GameConfig) {
    this.ctx = ctx
    this.gameConfig = gameConfig
    this.clock = new GameClock()
    this.eventBus = gameEventBus()
    this.nextFishId = 0

    // Instantiate players
    this.players = [
      new Player({
        x: this.gameConfig.boardDimensions.width / 2,
        y: this.gameConfig.boardDimensions.height - this.gameConfig.oceanDepth - this.gameConfig.rodTipHeightAboveWater,
      }, this),
    ]

    // Instantiate fish
    for (let i = 0; i < 10; i++) {
      this.fish.push(newFish(this, this.nextFishId))
      this.nextFishId++
    }

    // Instantiate ocean
    this.ocean = new Ocean()
  }

  start() {
    this.registerEventHandlers()

    const loop = () => {
      this.update()
      this.render()
    }

    window.setInterval(loop, 1000 / this.gameConfig.framesPerSecond)
  }

  private update() {
    this.fish.forEach(fish => fish.update(this.clock, this))
    this.players.forEach((player) => player.rod.update(this.clock, this))
  }

  private render() {
    this.ocean.draw(this.ctx, this)
    this.players.forEach(player => player.rod.draw(this.ctx, this))
    this.fish.forEach(fish => fish.draw(this.ctx, this))
  }

  private registerEventHandlers() {
    this.eventBus.on(Event.FishOutOfBounds, (fish: Fish) => this.respawnFish(fish))
    this.eventBus.on(Event.FishCollidedWithRod, (payload: any) => this.attachFishToRod(payload.fish, payload.rod))
  }

  private respawnFish(fish: Fish) {
    this.fish.splice(this.fish.findIndex(f => f.id === fish.id), 1, newFish(this, this.nextFishId))
    this.nextFishId++
  }

  private attachFishToRod(fish: Fish, rod: Rod) {
    this.respawnFish(fish)
    fish.position = rod.hookPosition()
    rod.attachFish(fish)
  }
}
