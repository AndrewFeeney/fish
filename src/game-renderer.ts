import Coordinates from "./coordinates"
import Game from "./game"

function drawLine(ctx: CanvasRenderingContext2D, origin: Coordinates, destination: Coordinates) {
    ctx.beginPath()

    // move the pen to the starting position for the line
    ctx.moveTo(origin.x, origin.y)

    // draw a line to the ending position for the line
    ctx.lineTo(destination.x, destination.y)

    // draw the line
    ctx.stroke()
}

export default class GameRenderer {
  width = 1080
  height = 720
  render(element: Element, game: Game) {
    element!.innerHTML = `
      <canvas
        id="game-board"
        width=${this.width}
        height=${this.height}
      ></canvas>
    `

    const gameBoardCanvas = document.getElementById('game-board') as HTMLCanvasElement
    const ctx = gameBoardCanvas.getContext('2d')

    const rod = game.players[0].rod
    drawLine(ctx!, rod.anchorPoint, rod.tip())
  }
}
