import Clock from './clock'

export default class GameClock implements Clock {
  startedAt: number

  constructor() {
    this.startedAt = (new Date()).getTime()
  }

  time() {
    return (new Date()).getTime() - this.startedAt
  }
}
