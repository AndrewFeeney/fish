import BoardCoordinates from "./board-coordinates"
import Game from "./game"
import Rod from "./rod"

const width = 1080
const height = 720

function drawLine(ctx: CanvasRenderingContext2D, origin: BoardCoordinates, destination: BoardCoordinates) {
  ctx.beginPath()

  // move the pen to the starting position for the line
  ctx.moveTo(origin.x, origin.y)

  // draw a line to the ending position for the line
  ctx.lineTo(destination.x, destination.y)

  // draw the line
  ctx.stroke()
}

function drawRod(ctx: CanvasRenderingContext2D, rod: Rod) {
  drawLine(ctx, rod.anchorPoint, rod.tip())
}

export default function renderGame(element: Element, game: Game) {
  element!.innerHTML = `
      <canvas
        id="game-board"
        width=${width}
        height=${height}
      ></canvas>
    `

  const gameBoardCanvas = document.getElementById('game-board') as HTMLCanvasElement
  const ctx = gameBoardCanvas.getContext('2d')

  if (!ctx) {
    return
  }

  const rod = game.players[0].rod
  drawRod(ctx, rod)
}