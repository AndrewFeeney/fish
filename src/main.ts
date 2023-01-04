import './style.css'
import Game from './game'
import GameClock from './game-clock'
import { Dimensions2D } from './dimensions-2d'
import {newGameConfig} from './game-config'

const boardDimensions: Dimensions2D = {
  width: 1080,
  height: 720,
}

const element = document.querySelector<HTMLDivElement>('#app') as Element
element.innerHTML = `
  <canvas
    id="game-board"
    width=${boardDimensions.width}
    height=${boardDimensions.height}
  ></canvas>
`
const canvas = document.getElementById('game-board') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
const gameConfig = newGameConfig()
const game = new Game(ctx, gameConfig)

game.start()
