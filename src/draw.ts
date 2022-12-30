import { BoardCoordinates } from './board-coordinates'

export function drawLine(ctx: CanvasRenderingContext2D, origin: BoardCoordinates, destination: BoardCoordinates) {
  ctx.beginPath()

  // move the pen to the starting position for the line
  ctx.moveTo(origin.x, origin.y)

  // draw a line to the ending position for the line
  ctx.lineTo(destination.x, destination.y)

  // draw the line
  ctx.stroke()
}

