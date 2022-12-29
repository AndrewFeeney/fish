import './style.css'
import Game from './game'
import renderGame from './render-game'

const game = new Game()
const element = document.querySelector<HTMLDivElement>('#app')
renderGame(element, game)


new Game()

