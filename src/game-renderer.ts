import Game from "./game"

export default class GameRenderer {
  render(game: Game): string {
    return `
      <canvas
        width=1080
        height=720
        style="background-color: blue"
      ></canvas>
    ` 
  }
}
