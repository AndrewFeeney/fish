import Game from './game'

export default interface Drawable {
  draw: (ctx: CanvasRenderingContext2D, game: Game) => void
}
