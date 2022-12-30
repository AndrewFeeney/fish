import Game from './game'

let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D

export default function renderGame(element: Element, game: Game) {
  if (!canvas) {
    element!.innerHTML = `
      <canvas
        id="game-board"
        width=${game.dimensions.width}
        height=${game.dimensions.height}
      ></canvas>
    `
    canvas = document.getElementById('game-board') as HTMLCanvasElement
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  }

  if (!ctx) {
    return
  }

  ctx.clearRect(0, 0, game.dimensions.width, game.dimensions.height)

  game.drawables.forEach(function (drawable) {
    drawable.draw(ctx, game)
  })
}
