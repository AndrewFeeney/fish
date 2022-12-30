import Game from "./game"
import GameClock from "./game-clock"

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

  const clock = new GameClock()

  const gameLoop = function () {
    game.updatables.forEach(function (updatable) {
      updatable.update(clock, game)
    })

    game.drawables.forEach(function (drawable) {
      drawable.draw(ctx, game)
    })
  }

  window.setInterval(gameLoop, 1000 / 60)
}
