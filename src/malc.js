// identity combinator
export const ID = (x) => x;

// boolean primitives
export const TRUE = (x) => (y) => x;

export const FALSE = (x) => (y) => y;

// boolean combinators
export const AND = (x) => (y) => x(y)(FALSE);

export const OR = (x) => (y) => x(TRUE)(y);

export const NOT = (x) => x(FALSE)(TRUE);

export const XOR = (x) => (y) => x(NOT(y))(y);

// branching
export const IF_THEN_ELSE = (p) => (x) => (y) => p(x)(y);

// natural numbers
export const ZERO = (f) => (x) => x;

export const ONE = (f) => (x) => f(x);

export const TWO = (f) => (x) => f(f(x));

export const THREE = (f) => (x) => f(f(f(x)));

export const FOUR = (f) => (x) => f(f(f(f(x))));

export const FIVE = (f) => (x) => f(f(f(f(f(x)))));

export const SIX = (f) => (x) => f(f(f(f(f(f(x))))));

export const SEVEN = (f) => (x) => f(f(f(f(f(f(f(x)))))));

export const EIGHT = (f) => (x) => f(f(f(f(f(f(f(f(x))))))));

export const NINE = (f) => (x) => f(f(f(f(f(f(f(f(f(x)))))))));

export const TEN = (f) => (x) => f(f(f(f(f(f(f(f(f(f(x))))))))));

// enumeration
export const SUCC = (n) => (f) => (x) => f(n(f)(x));

export const PRED = (n) =>
  n((p) => (z) => z(SUCC(p(TRUE)))(p(TRUE)))((z) => z(ZERO)(ZERO))(FALSE);

// basic arithmetic
export const PLUS = (n) => (m) => m(SUCC)(n);

export const MINUS = (n) => (m) => m(PRED)(n);

export const MULT = (n) => (m) => m(PLUS(n))(ZERO);

export const EXP = (n) => (m) => m(n);

// comparison
export const IS_ZERO = (n) => n((m) => FALSE)(TRUE);

export const LESS_THAN_OR_EQUAL = (n) => (m) => IS_ZERO(MINUS(n)(m));

export const LESS_THAN = (n) => (m) =>
  AND(LESS_THAN_OR_EQUAL(n)(m))(NOT(IS_ZERO(n(PRED)(m))));

export const EQUALS = (n) => (m) =>
  AND(LESS_THAN_OR_EQUAL(n)(m))(LESS_THAN_OR_EQUAL(m)(n));

export const GREATER_THAN_OR_EQUAL = (n) => (m) => IS_ZERO(n(PRED)(m));

export const GREATER_THAN = (n) => (m) =>
  AND(GREATER_THAN_OR_EQUAL(n)(m))(NOT(IS_ZERO(MINUS(n)(m))));

export const MAX = (x) => (y) => IF_THEN_ELSE(LESS_THAN_OR_EQUAL(x)(y))(y)(x);

export const MIN = (x) => (y) => IF_THEN_ELSE(EQUALS(MAX(x)(y))(x))(y)(x);

// function composition
export const COMPOSE = (f) => (g) => (x) => f(g(x));

// parameter swapping
export const FLIP = (f) => (x) => (y) => f(y)(x);

// recursion
export const FIX = (f) => ((x) => f((y) => x(x)(y)))((x) => f((y) => x(x)(y)));

// advanced arithmetic
export const MOD = FIX((r) => (n) => (m) =>
  IF_THEN_ELSE(LESS_THAN_OR_EQUAL(m)(n))((x) => r(MINUS(n)(m))(m)(x))(n)
);

export const DIV = FIX((r) => (n) => (m) =>
  IF_THEN_ELSE(LESS_THAN_OR_EQUAL(m)(n))((x) => SUCC(r(MINUS(n)(m))(m))(x))(
    ZERO
  )
);

// other combinators
export const EVEN = (n) => IS_ZERO(MOD(n)(TWO));

export const ODD = COMPOSE(NOT)(EVEN);

// pairs (tuples)
export const PAIR = (x) => (y) => (p) => p(x)(y);

export const FIRST = (p) => p((x) => (y) => x);

export const SECOND = (p) => p((x) => (y) => y);

export const SWAP = (p) => PAIR(SECOND(p))(FIRST(p));

// lists
export const LIST_ELEMENT = (x) => (xs) => PAIR(FALSE)(PAIR(x)(xs));

export const EMPTY_LIST = PAIR(TRUE)(TRUE);

export const IS_EMPTY = FIRST;

export const HEAD = (xs) => FIRST(SECOND(xs));

export const TAIL = (xs) => SECOND(SECOND(xs));

// list functions
export const FOLD = FIX((r) => (f) => (z) => (xs) =>
  IF_THEN_ELSE(IS_EMPTY(xs))(z)((x) => f(HEAD(xs))(r(f)(z)(TAIL(xs)))(x))
);

export const MAP = (f) => FOLD(COMPOSE(LIST_ELEMENT)(f))(EMPTY_LIST);

export const FILTER = (p) =>
  FOLD((x) => (xs) => IF_THEN_ELSE(p(x))(LIST_ELEMENT(x)(xs))(xs))(EMPTY_LIST);

export const RANGE = FIX((r) => (m) => (n) =>
  IF_THEN_ELSE(LESS_THAN_OR_EQUAL(m)(n))((x) =>
    LIST_ELEMENT(m)(r(SUCC(m))(n))(x)
  )(EMPTY_LIST)
);

export const INDEX = FIX((r) => (xs) => (n) =>
  IF_THEN_ELSE(IS_ZERO(n))(HEAD(xs))((x) => r(TAIL(xs))(PRED(n))(x))
);

export const PUSH = (x) => (xs) =>
  FOLD(LIST_ELEMENT)(LIST_ELEMENT(x)(EMPTY_LIST))(xs);

export const APPEND = FIX((r) => (xs) => (ys) =>
  IF_THEN_ELSE(IS_EMPTY(xs))(ys)((x) =>
    LIST_ELEMENT(HEAD(xs))(r(TAIL(xs))(ys))(x)
  )
);

export const LENGTH = (xs) =>
  FIX((r) => (xs) => (n) =>
    IF_THEN_ELSE(IS_EMPTY(xs))(n)((x) => r(TAIL(xs))(SUCC(n))(x))
  )(xs)(ZERO);

export const REVERSE = (xs) =>
  FIX((r) => (xs) => (a) =>
    IF_THEN_ELSE(IS_EMPTY(xs))(a)((x) =>
      r(TAIL(xs))(LIST_ELEMENT(HEAD(xs))(a))(x)
    )
  )(xs)(EMPTY_LIST);

export const TAKE = FIX((r) => (n) => (xs) =>
  IF_THEN_ELSE(LESS_THAN_OR_EQUAL(n)(ZERO))(EMPTY_LIST)(
    IF_THEN_ELSE(IS_EMPTY(xs))
  )(EMPTY_LIST)((x) => LIST_ELEMENT(HEAD(xs))(r(MINUS(n)(ONE))(TAIL(xs)))(x))
);

export const DROP = FIX((r) => (n) => (xs) =>
  IF_THEN_ELSE(LESS_THAN_OR_EQUAL(n)(ZERO))(xs)(
    IF_THEN_ELSE(IS_EMPTY(xs))(EMPTY_LIST)((x) => r(MINUS(n)(ONE))(TAIL(xs))(x))
  )
);

export const ZIP = FIX((r) => (xs) => (ys) =>
  IF_THEN_ELSE(IS_EMPTY(xs))(EMPTY_LIST)(
    IF_THEN_ELSE(IS_EMPTY(ys))(EMPTY_LIST)((x) =>
      LIST_ELEMENT(PAIR(HEAD(xs))(HEAD(ys)))(r(TAIL(xs))(TAIL(ys)))(x)
    )
  )
);

export const ZIP_WITH = FIX((r) => (f) => (xs) => (ys) =>
  IF_THEN_ELSE(IS_EMPTY(xs))(EMPTY_LIST)(
    IF_THEN_ELSE(IS_EMPTY(ys))(EMPTY_LIST)((x) =>
      LIST_ELEMENT(f(HEAD(xs))(HEAD(ys)))(r(f)(TAIL(xs))(TAIL(ys)))(x)
    )
  )
);

export const INSERT = FIX((r) => (n) => (xs) =>
  IF_THEN_ELSE(IS_EMPTY(xs))(LIST_ELEMENT(n)(EMPTY_LIST))(
    IF_THEN_ELSE(GREATER_THAN(n)(HEAD(xs)))((x) =>
      LIST_ELEMENT(HEAD(xs))(r(n)(TAIL(xs)))(x)
    )(LIST_ELEMENT(n)(xs))
  )
);

export const SORT = FOLD(INSERT)(EMPTY_LIST);

export const REPEAT = (x) => FIX((r) => LIST_ELEMENT(x)(r));

// folds
export const SUM_FOLD = FOLD(PLUS)(ZERO);

export const PRODUCT_FOLD = FOLD(MULT)(ONE);

export const AND_FOLD = FOLD(AND)(TRUE);

export const OR_FOLD = FOLD(OR)(FALSE);

export const LENGTH_FOLD = FOLD((x) => (n) => PLUS(ONE)(n))(ZERO);

export const REVERSE_FOLD = FOLD((x) => (xs) =>
  APPEND(xs)(LIST_ELEMENT(x)(EMPTY_LIST))
)(EMPTY_LIST);

export const FOLDL = (f) => (z) => (xs) =>
  FOLD((x) => (g) => (y) => g(f(y)(x)))(ID)(xs)(z);

export const REVERSE_FOLDL = FOLDL((xs) => (x) => LIST_ELEMENT(x)(xs))(
  EMPTY_LIST
); /* more efficient than FOLD for this operation */

// trees
export const EMPTY_TREE = EMPTY_LIST;

export const NODE = (v) => (l) => (r) =>
  LIST_ELEMENT(v)(LIST_ELEMENT(l)(LIST_ELEMENT(r)(EMPTY_TREE)));

export const VALUE = HEAD;

export const LEFT = (t) => HEAD(TAIL(t));

export const RIGHT = (t) => HEAD(TAIL(TAIL(t)));

// factorial
export const FACT = FIX((r) => (n) =>
  IS_ZERO(n)(ONE)((x) => MULT(n)(r(PRED(n)))(x))
);

// fibonacci
export const FIB = FIX((r) => (n) =>
  IS_ZERO(n)(ZERO)(
    IF_THEN_ELSE(EQUALS(n)(ONE))(ONE)((x) =>
      PLUS(r(MINUS(n)(ONE)))(r(MINUS(n)(TWO)))(x)
    )
  )
);
