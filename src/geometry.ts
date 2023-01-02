import { BoardCoordinates } from './board-coordinates'

export function distanceBetween(pointA: BoardCoordinates, pointB: BoardCoordinates): number {
  const sideXLength = Math.abs(pointA.x - pointB.x)
  const sideYLength = Math.abs(pointA.y - pointB.y)

  return Math.sqrt(Math.pow(sideXLength, 2) + Math.pow(sideYLength, 2))
}
