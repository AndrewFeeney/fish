import './style.css'
import Game from './game'
import renderGame from './render-game'
import GameClock from './game-clock'

const game = new Game({ width: 1080, height: 720 })
const element = document.querySelector<HTMLDivElement>('#app') as Element

const clock = new GameClock()

const gameLoop = function () {
  game.updatables.forEach(function (updatable) {
    updatable.update(clock, game)
  })

  renderGame(element, game)
}

window.setInterval(gameLoop, 1000 / 60)

