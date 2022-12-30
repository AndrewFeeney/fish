import { BoardCoordinates } from "./board-coordinates"
import {Dimensions2D} from "./dimensions-2d"
import Game from "./game"
import Rod from "./rod"


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

function drawOcean(ctx: CanvasRenderingContext2D, dimensions: Dimensions2D) {
  ctx.fillStyle = "#006699";
  ctx.fillRect(0, 50, dimensions.width, dimensions.height);
}

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

  drawOcean(ctx, game.dimensions)
  drawRod(ctx, game.players[0].rod)
}
