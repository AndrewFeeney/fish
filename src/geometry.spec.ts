import { BoardCoordinates } from './board-coordinates'
import { distanceBetween } from './geometry'

describe('distanceBetween function', () => {
  it('can get the distance between two horizontal points', () => {
    const pointA: BoardCoordinates = { x: 0, y: 1 }
    const pointB: BoardCoordinates = { x: 1, y: 1 }

    expect(distanceBetween(pointA, pointB)).toBe(1)
  })

  it('can get the distance between two vertical points', () => {
    const pointA: BoardCoordinates = { x: 0, y: -1 }
    const pointB: BoardCoordinates = { x: 0, y: 1 }

    expect(distanceBetween(pointA, pointB)).toBe(2)
  })

  it('can get the distance between two diagonal points', () => {
    const pointA: BoardCoordinates = { x: -1, y: -1 }
    const pointB: BoardCoordinates = { x: 1, y: 1 }

    expect(distanceBetween(pointA, pointB)).toBe(Math.sqrt(2) * 2)
  })
})

