export const groupBy = <T>(elems: T[], match: (a: T, b: T) => boolean): T[][] => {
    let currentChar: T;
    let arr: T[][] = [];
    elems.forEach(el => {
        if (!match(el, currentChar)) {
            currentChar = el;
            arr.push([el]);
        } else {
            arr[arr.length - 1].push(el);
        }
    });
    return arr;
}
