class Publisher {
  private observers: Observer[];

  constructor() {
    this.observers = [];
  }

  public add(observer: Observer) {
    this.observers.push(observer);
  }

  public remove(observer: Observer) {
    this.observers.forEach((ele, index) => {
      if (ele === observer) {
        this.observers.splice(index, 1);
      }
    });
  }

  public notify() {
    this.observers.forEach((ele) => {
      ele.work();
    });
  }
}

class Observer {
  constructor() {}

  public work() {
    console.log('该干活了');
  }
}

const ob1 = new Observer();
const ob2 = new Observer();
const publisher = new Publisher();

publisher.add(ob1);
publisher.add(ob2);
publisher.notify();

class EventEmitter {
  private handlers: ((...rest: any[]) => void)[][];

  constructor() {
    this.handlers = [];
  }

  on(name, cb) {
    if (!this.handlers[name]) {
      this.handlers[name] = [];
    }
    this.handlers[name].push(cb);
  }

  remove(name, cb) {
    if (!cb) {
      this.handlers[name] = [];
    } else {
      this.handlers[name].forEach((ele, index) => {
        if (ele === cb) {
          this.handlers[name].splice(index, 1);
        }
      });
    }
  }

  emit(name, ...argments) {
    if (this.handlers[name]) {
      this.handlers[name].forEach((cb) => {
        cb(...argments);
      });
    }
  }

  once(name, cb) {
    function fn(...argments) {
      cb(...argments);
      this.remove(name, fn);
    }
    this.on(name, fn);
  }
}
