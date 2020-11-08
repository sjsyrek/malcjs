// identity combinator
const ID = (x) => x;

// boolean primitives
const TRUE = (x) => (y) => x;

const FALSE = (x) => (y) => y;

// boolean combinators
const AND = (x) => (y) => x(y)(FALSE);

const OR = (x) => (y) => x(TRUE)(y);

const NOT = (x) => x(FALSE)(TRUE);

const XOR = (x) => (y) => x(NOT(y))(y);

// branching
const IF_THEN_ELSE = (p) => (x) => (y) => p(x)(y);

// natural numbers
const ZERO = (f) => (x) => x;

const ONE = (f) => (x) => f(x);

const TWO = (f) => (x) => f(f(x));

const THREE = (f) => (x) => f(f(f(x)));

const FOUR = (f) => (x) => f(f(f(f(x))));

const FIVE = (f) => (x) => f(f(f(f(f(x)))));

const SIX = (f) => (x) => f(f(f(f(f(f(x))))));

const SEVEN = (f) => (x) => f(f(f(f(f(f(f(x)))))));

const EIGHT = (f) => (x) => f(f(f(f(f(f(f(f(x))))))));

const NINE = (f) => (x) => f(f(f(f(f(f(f(f(f(x)))))))));

const TEN = (f) => (x) => f(f(f(f(f(f(f(f(f(f(x))))))))));

// enumeration
const SUCC = (n) => (f) => (x) => f(n(f)(x));

const PRED = (n) =>
  n((p) => (z) => z(SUCC(p(TRUE)))(p(TRUE)))((z) => z(ZERO)(ZERO))(FALSE);

// basic arithmetic
const PLUS = (n) => (m) => m(SUCC)(n);

const MINUS = (n) => (m) => m(PRED)(n);

const MULT = (n) => (m) => m(PLUS(n))(ZERO);

const EXP = (n) => (m) => m(n);

// comparison
const IS_ZERO = (n) => n((m) => FALSE)(TRUE);

const LESS_THAN_OR_EQUAL = (n) => (m) => IS_ZERO(MINUS(n)(m));

const LESS_THAN = (n) => (m) =>
  AND(LESS_THAN_OR_EQUAL(n)(m))(NOT(IS_ZERO(n(PRED)(m))));

const EQUALS = (n) => (m) =>
  AND(LESS_THAN_OR_EQUAL(n)(m))(LESS_THAN_OR_EQUAL(m)(n));

const GREATER_THAN_OR_EQUAL = (n) => (m) => IS_ZERO(n(PRED)(m));

const GREATER_THAN = (n) => (m) =>
  AND(GREATER_THAN_OR_EQUAL(n)(m))(NOT(IS_ZERO(MINUS(n)(m))));

const MAX = (x) => (y) => IF_THEN_ELSE(LESS_THAN_OR_EQUAL(x)(y))(y)(x);

const MIN = (x) => (y) => IF_THEN_ELSE(EQUALS(MAX(x)(y))(x))(y)(x);

// function composition
const COMPOSE = (f) => (g) => (x) => f(g(x));

// parameter swapping
const FLIP = (f) => (x) => (y) => f(y)(x);

// recursion
const FIX = (f) => ((x) => f((y) => x(x)(y)))((x) => f((y) => x(x)(y)));

// advanced arithmetic
const MOD = FIX((r) => (n) => (m) =>
  IF_THEN_ELSE(LESS_THAN_OR_EQUAL(m)(n))((x) => r(MINUS(n)(m))(m)(x))(n)
);

const DIV = FIX((r) => (n) => (m) =>
  IF_THEN_ELSE(LESS_THAN_OR_EQUAL(m)(n))((x) => SUCC(r(MINUS(n)(m))(m))(x))(
    ZERO
  )
);

// other combinators
const EVEN = (n) => IS_ZERO(MOD(n)(TWO));

const ODD = COMPOSE(NOT)(EVEN);

// pairs (tuples)
const PAIR = (x) => (y) => (p) => p(x)(y);

const FIRST = (p) => p((x) => (y) => x);

const SECOND = (p) => p((x) => (y) => y);

const SWAP = (p) => PAIR(SECOND(p))(FIRST(p));

// lists
const LIST_ELEMENT = (x) => (xs) => PAIR(FALSE)(PAIR(x)(xs));

const EMPTY_LIST = PAIR(TRUE)(TRUE);

const IS_EMPTY = FIRST;

const HEAD = (xs) => FIRST(SECOND(xs));

const TAIL = (xs) => SECOND(SECOND(xs));

// list functions
const FOLD = FIX((r) => (f) => (z) => (xs) =>
  IF_THEN_ELSE(IS_EMPTY(xs))(z)((x) => f(HEAD(xs))(r(f)(z)(TAIL(xs)))(x))
);

const MAP = (f) => FOLD(COMPOSE(LIST_ELEMENT)(f))(EMPTY_LIST);

const FILTER = (p) =>
  FOLD((x) => (xs) => IF_THEN_ELSE(p(x))(LIST_ELEMENT(x)(xs))(xs))(EMPTY_LIST);

const RANGE = FIX((r) => (m) => (n) =>
  IF_THEN_ELSE(LESS_THAN_OR_EQUAL(m)(n))((x) =>
    LIST_ELEMENT(m)(r(SUCC(m))(n))(x)
  )(EMPTY_LIST)
);

const INDEX = FIX((r) => (xs) => (n) =>
  IF_THEN_ELSE(IS_ZERO(n))(HEAD(xs))((x) => r(TAIL(xs))(PRED(n))(x))
);

const PUSH = (x) => (xs) => FOLD(LIST_ELEMENT)(LIST_ELEMENT(x)(EMPTY_LIST))(xs);

const APPEND = FIX((r) => (xs) => (ys) =>
  IF_THEN_ELSE(IS_EMPTY(xs))(ys)((x) =>
    LIST_ELEMENT(HEAD(xs))(r(TAIL(xs))(ys))(x)
  )
);

const LENGTH = (xs) =>
  FIX((r) => (xs) => (n) =>
    IF_THEN_ELSE(IS_EMPTY(xs))(n)((x) => r(TAIL(xs))(SUCC(n))(x))
  )(xs)(ZERO);

const REVERSE = (xs) =>
  FIX((r) => (xs) => (a) =>
    IF_THEN_ELSE(IS_EMPTY(xs))(a)((x) =>
      r(TAIL(xs))(LIST_ELEMENT(HEAD(xs))(a))(x)
    )
  )(xs)(EMPTY_LIST);

const TAKE = FIX((r) => (n) => (xs) =>
  IF_THEN_ELSE(LESS_THAN_OR_EQUAL(n)(ZERO))(EMPTY_LIST)(
    IF_THEN_ELSE(IS_EMPTY(xs))
  )(EMPTY_LIST)((x) => LIST_ELEMENT(HEAD(xs))(r(MINUS(n)(ONE))(TAIL(xs)))(x))
);

const DROP = FIX((r) => (n) => (xs) =>
  IF_THEN_ELSE(LESS_THAN_OR_EQUAL(n)(ZERO))(xs)(
    IF_THEN_ELSE(IS_EMPTY(xs))(EMPTY_LIST)((x) => r(MINUS(n)(ONE))(TAIL(xs))(x))
  )
);

const ZIP = FIX((r) => (xs) => (ys) =>
  IF_THEN_ELSE(IS_EMPTY(xs))(EMPTY_LIST)(
    IF_THEN_ELSE(IS_EMPTY(ys))(EMPTY_LIST)((x) =>
      LIST_ELEMENT(PAIR(HEAD(xs))(HEAD(ys)))(r(TAIL(xs))(TAIL(ys)))(x)
    )
  )
);

const ZIP_WITH = FIX((r) => (f) => (xs) => (ys) =>
  IF_THEN_ELSE(IS_EMPTY(xs))(EMPTY_LIST)(
    IF_THEN_ELSE(IS_EMPTY(ys))(EMPTY_LIST)((x) =>
      LIST_ELEMENT(f(HEAD(xs))(HEAD(ys)))(r(f)(TAIL(xs))(TAIL(ys)))(x)
    )
  )
);

const INSERT = FIX((r) => (n) => (xs) =>
  IF_THEN_ELSE(IS_EMPTY(xs))(LIST_ELEMENT(n)(EMPTY_LIST))(
    IF_THEN_ELSE(GREATER_THAN(n)(HEAD(xs)))((x) =>
      LIST_ELEMENT(HEAD(xs))(r(n)(TAIL(xs)))(x)
    )(LIST_ELEMENT(n)(xs))
  )
);

const SORT = FOLD(INSERT)(EMPTY_LIST);

const REPEAT = (x) => FIX((r) => LIST_ELEMENT(x)(r));

// folds
const SUM_FOLD = FOLD(PLUS)(ZERO);

const PRODUCT_FOLD = FOLD(MULT)(ONE);

const AND_FOLD = FOLD(AND)(TRUE);

const OR_FOLD = FOLD(OR)(FALSE);

const LENGTH_FOLD = FOLD((x) => (n) => PLUS(ONE)(n))(ZERO);

const REVERSE_FOLD = FOLD((x) => (xs) =>
  APPEND(xs)(LIST_ELEMENT(x)(EMPTY_LIST))
)(EMPTY_LIST);

const FOLDL = (f) => (z) => (xs) =>
  FOLD((x) => (g) => (y) => g(f(y)(x)))(ID)(xs)(z);

const REVERSE_FOLDL = FOLDL((xs) => (x) => LIST_ELEMENT(x)(xs))(
  EMPTY_LIST
); /* more efficient than FOLD for this operation */

// trees
const EMPTY_TREE = EMPTY_LIST;

const NODE = (v) => (l) => (r) =>
  LIST_ELEMENT(v)(LIST_ELEMENT(l)(LIST_ELEMENT(r)(EMPTY_TREE)));

const VALUE = HEAD;

const LEFT = (t) => HEAD(TAIL(t));

const RIGHT = (t) => HEAD(TAIL(TAIL(t)));

// factorial
const FACT = FIX((r) => (n) => IS_ZERO(n)(ONE)((x) => MULT(n)(r(PRED(n)))(x)));

// fibonacci
const FIB = FIX((r) => (n) =>
  IS_ZERO(n)(ZERO)(
    IF_THEN_ELSE(EQUALS(n)(ONE))(ONE)((x) =>
      PLUS(r(MINUS(n)(ONE)))(r(MINUS(n)(TWO)))(x)
    )
  )
);

module.exports = {
  ID,
  TRUE,
  FALSE,
  AND,
  OR,
  NOT,
  XOR,
  IF_THEN_ELSE,
  ZERO,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
  SUCC,
  PRED,
  PLUS,
  MINUS,
  MULT,
  EXP,
  IS_ZERO,
  LESS_THAN_OR_EQUAL,
  LESS_THAN,
  EQUALS,
  GREATER_THAN_OR_EQUAL,
  GREATER_THAN,
  MAX,
  MIN,
  COMPOSE,
  FLIP,
  FIX,
  MOD,
  DIV,
  EVEN,
  ODD,
  PAIR,
  FIRST,
  SECOND,
  SWAP,
  LIST_ELEMENT,
  EMPTY_LIST,
  IS_EMPTY,
  HEAD,
  TAIL,
  FOLD,
  MAP,
  FILTER,
  RANGE,
  INDEX,
  PUSH,
  APPEND,
  LENGTH,
  REVERSE,
  TAKE,
  DROP,
  ZIP,
  ZIP_WITH,
  INSERT,
  SORT,
  REPEAT,
  SUM_FOLD,
  PRODUCT_FOLD,
  AND_FOLD,
  OR_FOLD,
  LENGTH_FOLD,
  REVERSE_FOLD,
  FOLDL,
  REVERSE_FOLDL,
  EMPTY_TREE,
  NODE,
  VALUE,
  LEFT,
  RIGHT,
  FACT,
  FIB,
};
