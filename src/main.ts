import './style.css'
import Game from './game'
import renderGame from './render-game'

const game = new Game({ width: 1080, height: 720 })
const element = document.querySelector<HTMLDivElement>('#app') as Element
renderGame(element, game)

new Game()

