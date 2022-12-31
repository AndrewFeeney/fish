export enum Event {
  FishOutOfBounds = 'FishOutOfBounds',
}

export interface EventBus {
  on(event: Event, callback: Function): void
  emit(event: Event, payload?: any): void
}

export function gameEventBus(): EventBus {
  const listeners: {[key: string]: Array<Function>} = {}

  Object.keys(Event).forEach(key => listeners[key] = [])

  return {
    on: (event: Event, callback) => {
      listeners[event].push(callback)
    },

    emit: (event: Event, payload?: any) => {
      listeners[event].forEach(callback => (callback)(payload))
    },
  }
}
