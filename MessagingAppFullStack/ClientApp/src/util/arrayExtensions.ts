declare global {
  interface Array<T> {
    groupBy(match: (a: T, b: T) => boolean): Array<Array<T>>;
  }
}

Array.prototype.groupBy = function <T>(match: (a: T, b: T) => boolean) {
  let currentChar: T;
  let arr: T[][] = [];
  this.forEach((el) => {
    if (!match(el, currentChar)) {
      currentChar = el;
      arr.push([el]);
    } else {
      arr[arr.length - 1].push(el);
    }
  });
  return arr;
};

export {};
