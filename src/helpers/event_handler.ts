type TypeEvent = (data: any) => void;

class EventHandler {

  events: { [key: string]: TypeEvent[] };
  static instance: EventHandler | null = null;

  public static getInstace() {
    if (!this.instance) {
      this.instance = new EventHandler();
    }

    return this.instance;
  }

  private constructor() {
    this.events = {};
  }

  on(eventName: string, handler: TypeEvent) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(handler);
  }

  emit(eventName: string, data: any) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((handler) => handler(data));
    }
  }
}

export default EventHandler.getInstace();
