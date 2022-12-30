import Game from "./game"

export default function renderGame(element: Element, game: Game) {
  element!.innerHTML = `
    <canvas
      id="game-board"
      width=${game.dimensions.width}
      height=${game.dimensions.height}
    ></canvas>
  `
  const gameBoardCanvas = document.getElementById('game-board') as HTMLCanvasElement
  const ctx = gameBoardCanvas.getContext('2d')

  if (!ctx) {
    return
  }


  game.drawables.forEach(function (drawable) {
    drawable.draw(ctx, game)
  })
}
