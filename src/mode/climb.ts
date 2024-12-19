const climb = (n: number) => {
  let x1 = 0,
    x2 = 0,
    current = 1;

  for (let i = 0; i < n; i++) {
    x1 = x2;
    x2 = current;
    current = x1 + x2;
  }

  console.log(current);
  return current;
};

climb(2);
climb(3);
climb(5);

const generate = (n: number) => {
  const result: string[] = [];

  const collect = (current: string, left: number, right: number) => {
    if (!left && !right) {
      result.push(current);
      return;
    }
    if (left) collect(current + '(', left - 1, right);
    if (left < right) collect(current + ')', left, right - 1);
  };

  collect('', n, n);

  return result;
};

console.log(generate(3));

const find = (strs: string[]): string => {
  // 找出统一部分的长度
  let less = strs.reduce((pre: number, cur: string, idx: number) => {
    return idx ? Math.min(pre, cur.length) : cur.length;
  }, 0);

  // 摘出一个
  const [first, ...rest] = strs;
  while (less) {
    // 那其中一个和其他的对比，相等就返回当前前缀
    const t = first.substring(0, less);
    if (rest.every((v) => t === v.substring(0, less))) {
      return t;
    }

    less--;
  }

  return '';
};

console.log(find(['flower', 'flow', 'flight']));
