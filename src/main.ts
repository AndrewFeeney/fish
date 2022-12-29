import './style.css'
import Game from './game'
import GameRenderer from './game-renderer'

const gameRenderer = new GameRenderer()
const game = new Game()
const html = gameRenderer.render(game)
document.querySelector<HTMLDivElement>('#app')!.innerHTML = html

new Game()

