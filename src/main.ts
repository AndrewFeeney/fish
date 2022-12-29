import './style.css'
import Game from './game'
import GameRenderer from './game-renderer'

const gameRenderer = new GameRenderer()
const game = new Game()
const element = document.querySelector<HTMLDivElement>('#app')
gameRenderer.render(element, game)


new Game()

