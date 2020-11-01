import {
  EMPTY_LIST,
  FALSE,
  FIRST,
  HEAD,
  IF_THEN_ELSE,
  IS_EMPTY,
  LEFT,
  LIST_ELEMENT,
  RIGHT,
  SECOND,
  TAIL,
  TRUE,
  VALUE,
} from "./malc";

export const toBool = (b) => IF_THEN_ELSE(b)(true)(false);

export const fromBool = (b) => (b ? TRUE : FALSE);

export const toInt = (n) => n((x) => x + 1)(0);

export const fromInt = (n) =>
  n == 0 ? (f) => (x) => x : (f) => (x) => f(fromInt(n - 1)(f)(x));

export const toArray = (xs) =>
  [].concat(toBool(IS_EMPTY(xs)) ? [] : [HEAD(xs)].concat(toArray(TAIL(xs))));

export const fromArray = (xs) =>
  xs.length === 0 ? EMPTY_LIST : LIST_ELEMENT(xs[0])(fromArray(xs.slice(1)));

export const toArrayInt = (xs) =>
  [].concat(
    toBool(IS_EMPTY(xs)) ? [] : [toInt(HEAD(xs))].concat(toArrayInt(TAIL(xs)))
  );

export const fromArrayInt = (xs) =>
  xs.length === 0
    ? EMPTY_LIST
    : LIST_ELEMENT(fromInt(xs[0]))(fromArrayInt(xs.slice(1)));

export const toPair = (p) => {
  return { fst: FIRST(p), snd: SECOND(p) };
};

export const toPairInt = (p) => {
  return { fst: toInt(FIRST(p)), snd: toInt(SECOND(p)) };
};

export const printPair = (p) => `(${p.fst},${p.snd})`;

export const toString = (str) =>
  toArrayInt(str)
    .map((n) => String.fromCharCode(n))
    .join("");

export const fromString = (str) =>
  str.length === 0
    ? EMPTY_LIST
    : LIST_ELEMENT(fromInt(str.charCodeAt(str[0])))(fromString(str.substr(1)));

export const toTreeInt = (t) =>
  toBool(IS_EMPTY(t))
    ? []
    : [toInt(VALUE(t)), toTreeInt(LEFT(t)), toTreeInt(RIGHT(t))];

export const printTree = (t) =>
  t.length === 0 ? "[]" : `[${t[0]}, ${printTree(t[1])}, ${printTree(t[2])}]`;

export const toFizzBuzz = (fb) =>
  toArray(fb).map((x) => (toString(x) === "" ? toInt(x) : toString(x)));

export const toLambda = (x) => {
  if (Number.isInteger(x)) return fromInt(x);
  if (typeof x === "boolean") return fromBool(x);
  if (typeof x === "string") return fromString(x);
  if (Array.isArray(x)) return fromArray(x.map((y) => toLambda(y)));
  return x;
};
