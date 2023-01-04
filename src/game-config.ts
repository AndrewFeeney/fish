import { Dimensions2D } from './dimensions-2d'

export interface GameConfig {
  boardDimensions: Dimensions2D
  framesPerSecond: number
  maxFish: number
  maxFishRadius: number
  oceanDepth: number
  rodTipHeightAboveWater: number
  rodInitialLineLength: number
}

export function newGameConfig(): GameConfig {
  return {
    boardDimensions: {
      height: 720,
      width: 1080,
    },
    framesPerSecond: 60,
    maxFish: 10,
    maxFishRadius: 50,
    oceanDepth: 520,
    rodTipHeightAboveWater: 100,
    rodInitialLineLength: 90,
  }
}
