
class EventHandler {
  events: { [key: string]: Function[] };

  private constructor() {
    this.events = {};
  }

  public static get instance(): EventHandler {
    if (!global.instance) {
      global.instance = new EventHandler();
    }

    return global.instance;
  }

  public on(eventName: string, handler: Function) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(handler);
  }

  public emit(eventName: string, data: any) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((handler) => handler(data));
    }
  }
}

const eventHandler = EventHandler.instance;

export default eventHandler;