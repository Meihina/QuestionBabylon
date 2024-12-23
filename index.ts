type TPayload = Record<string | symbol, any>;

class Singleton {
  public static instance: Singleton | null = null;

  private payload: TPayload = {};

  constructor(payload: TPayload) {
    this.payload = payload;
  }

  static getInstance(payload: TPayload) {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton(payload);
    }
    return Singleton.instance;
  }

  getPayload() {
    return this.payload;
  }

  setField(key: string | symbol, value: any) {
    this.payload[key] = value;
  }

  getField(key: string | symbol) {
    return this.payload[key];
  }
}

const singleA = Singleton.getInstance({ a: 10, b: 20 });
const singleB = Singleton.getInstance({ a: 10, b: 20 });
singleA.setField('a', 11);

console.log(singleA, singleB, singleA === singleB);
