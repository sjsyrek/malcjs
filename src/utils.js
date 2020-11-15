const λ = require("./malc");

const toBool = (b) => λ.IF_THEN_ELSE(b)(true)(false);

const fromBool = (b) => (b ? λ.TRUE : λ.FALSE);

const toInt = (n) => n((x) => x + 1)(0);

const fromInt = (n) =>
  n == 0 ? (f) => (x) => x : (f) => (x) => f(fromInt(n - 1)(f)(x));

const toArray = (xs) =>
  [].concat(
    toBool(λ.IS_EMPTY(xs)) ? [] : [λ.HEAD(xs)].concat(toArray(λ.TAIL(xs)))
  );

const fromArray = (xs) =>
  xs.length === 0
    ? λ.EMPTY_LIST
    : λ.LIST_ELEMENT(xs[0])(fromArray(xs.slice(1)));

const toArrayInt = (xs) =>
  [].concat(
    toBool(λ.IS_EMPTY(xs))
      ? []
      : [toInt(λ.HEAD(xs))].concat(toArrayInt(λ.TAIL(xs)))
  );

const fromArrayInt = (xs) =>
  xs.length === 0
    ? λ.EMPTY_LIST
    : λ.LIST_ELEMENT(fromInt(xs[0]))(fromArrayInt(xs.slice(1)));

const toPair = (p) => {
  return { fst: λ.FIRST(p), snd: λ.SECOND(p) };
};

const toPairInt = (p) => {
  return { fst: toInt(λ.FIRST(p)), snd: toInt(λ.SECOND(p)) };
};

const printPair = (p) => `(${p.fst},${p.snd})`;

const printPairInt = λ.COMPOSE(printPair)(toPairInt);

const toChar = (chr) => String.fromCharCode(toInt(chr));

const toString = (str) => toArray(str).map(toChar).join("");

const fromString = (str) =>
  str.length === 0
    ? λ.EMPTY_LIST
    : λ.LIST_ELEMENT(fromInt(str.charCodeAt(str[0])))(
        fromString(str.substr(1))
      );

const toTreeInt = (t) =>
  toBool(λ.IS_EMPTY(t))
    ? []
    : [toInt(λ.VALUE(t)), toTreeInt(λ.LEFT(t)), toTreeInt(λ.RIGHT(t))];

const printTree = (t) =>
  t.length === 0 ? "[]" : `[${t[0]}, ${printTree(t[1])}, ${printTree(t[2])}]`;

const printTreeInt = λ.COMPOSE(printTree)(toTreeInt);

const toFizzBuzz = (fb) =>
  toArray(fb).map((x) => (toString(x) === "" ? toInt(x) : toString(x)));

const toLambda = (x) => {
  if (Number.isInteger(x)) return fromInt(x);
  if (typeof x === "boolean") return fromBool(x);
  if (typeof x === "string") return fromString(x);
  if (Array.isArray(x)) return fromArray(x.map((y) => toLambda(y)));
  return x;
};

module.exports = {
  toBool,
  fromBool,
  toInt,
  fromInt,
  toArray,
  fromArray,
  toArrayInt,
  fromArrayInt,
  toPair,
  toPairInt,
  printPair,
  printPairInt,
  toChar,
  toString,
  fromString,
  toTreeInt,
  printTree,
  printTreeInt,
  toFizzBuzz,
  toLambda,
};
