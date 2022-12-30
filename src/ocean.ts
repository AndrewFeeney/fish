import Drawable from './drawable'
import Game from './game'

export default class Ocean implements Drawable {
  draw (ctx: CanvasRenderingContext2D, game: Game) {
    ctx.fillStyle = "#006699";
    ctx.fillRect(0, 50, game.dimensions.width, game.dimensions.height);
  }
}
