type TPayload = Record<string | symbol, any>;

class Singleton {
  public static instance: Singleton | null = null;

  private payload: TPayload = {};

  constructor(payload: TPayload) {
    if (!Singleton.instance) {
      this.payload = payload;
      Singleton.instance = this;
    } else {
      return Singleton.instance;
    }
  }

  // static getInstance(payload: TPayload) {
  //   if (!Singleton.instance) {
  //     Singleton.instance = new Singleton(payload);
  //   }
  //   return Singleton.instance;
  // }

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

const singleA = new Singleton({ a: 10, b: 20 }); // 这里会创建
const singleB = new Singleton({ a: 10, b: 20 }); // 这里直接返回
singleA.setField('a', 11);

console.log(singleA, singleB, singleA === singleB);
