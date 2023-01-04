import Drawable from './drawable'
import Game from './game'

export default class Ocean implements Drawable {
  draw (ctx: CanvasRenderingContext2D, game: Game) {
    ctx.fillStyle = "#006699";
    ctx.fillRect(
      0,
      game.gameConfig.boardDimensions.height - game.gameConfig.oceanDepth,
      game.gameConfig.boardDimensions.width,
      game.gameConfig.boardDimensions.height
    );
  }
}
