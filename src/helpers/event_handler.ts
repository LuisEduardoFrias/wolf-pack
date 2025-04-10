
export default class EventHandler {
  static #instance: EventHandler;
  events: { [key: string]: Function[] };
  rando: number;

  private constructor() {
    this.events = {};
    this.rando = Math.random();
  }

  public static get instance(): EventHandler {
    if (!EventHandler.#instance) {
      EventHandler.#instance = new EventHandler();
    }

    return EventHandler.#instance;
  }

  public on(eventName: string, handler: Function) {
    console.log('on (Paquete): ', eventName, this.rando, this.events);

    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(handler);
  }

  public emit(eventName: string, data: any) {
    console.log('emit (Paquete): ', eventName, this.rando, this.events);

    if (this.events[eventName]) {
      this.events[eventName].forEach((handler) => handler(data));
    }
  }
}