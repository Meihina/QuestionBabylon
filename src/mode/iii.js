// function pInstanceOf(instance, target) {
//   if (typeof instance !== 'object' || instance === null) {
//     return false;
//   }

//   let proto = instance.__proto__;
//   // 不是null的时候
//   while (proto) {
//     if (proto === target.prototype) {
//       return true;
//     }

//     proto = proto.__proto__;
//   }

//   return false;
// }

// function pNew(constructor, ...argments) {
//   const p = new Object({});
//   Object.setPrototypeOf(p, constructor.prototype);
//   const result = constructor.call(p, ...argments);
//   return result;
// }

import { glob } from 'glob';

const exec = (success, fall) => {
  success({ code: 1 });
};

const callNative = () => {
  return new Promise((resolve, reject) => {
    exec(resolve, reject);
  })
    .then((result) => {
      if (result.code === 1) {
        return result;
      }
      Promise.reject(result);
    })
    .catch((error) => {
      Promise.reject(error);
    });
};

callNative().then((result) => {
  console.log('2' + result);
});

const files = await glob(`./*`);
console.log(files);

const getType = (data) => {
  const origin = Object.prototype.toString.call(data);
  const start = origin.indexOf(' ') + 1;
  const end = origin.length - 1;
  return origin.substring(start, end);
};

console.log(getType('new Object()'));

const flatten = (arr) => {
  let result = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flatten(item));
    } else {
      result.push(item);
    }
  }

  return result;
};

console.log(flatten([1, [2, [3, 55]], 4, [12]]));
