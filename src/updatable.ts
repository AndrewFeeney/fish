import Game from './game'
import Clock from './clock'

export default interface Updatable {
  update: (clock: Clock, game: Game) => void
}
