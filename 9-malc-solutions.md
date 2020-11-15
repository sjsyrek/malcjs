# 9 Malc Problems (Solutions)

## Problem 1

Find the last element of a list.

```js
const lastElem = COMPOSE(HEAD)(REVERSE);
```

```js
const lastElem = (xs) => INDEX(xs)(MINUS(LENGTH(xs))(ONE));
```

## Problem 2

Find the last but one element of a list.

```js
const penultimate = (xs) => INDEX(REVERSE(xs))(ONE);
```

```js
const penultimate = COMPOSE(FLIP(INDEX)(ONE))(REVERSE);
```

```js
const LAST = FIX((r) => (xs) =>
  IF_THEN_ELSE(EQUALS(LENGTH(xs))(ONE))(HEAD(xs))((x) => r(TAIL(xs))(x))
);

const INIT = FIX((r) => (xs) =>
  IF_THEN_ELSE(EQUALS(LENGTH(xs))(ONE))(EMPTY_LIST)((x) =>
    LIST_ELEMENT(HEAD(xs))(r(TAIL(xs)))(x)
  )
);

const penultimate = COMPOSE(LAST)(INIT);
```

```js
const penultimate = COMPOSE(HEAD)(COMPOSE(TAIL)(REVERSE));
```

## Problem 3

Find the K'th element of a list. The first element in the list is number 1.

```js
const elementAt = (xs) => (n) => INDEX(xs)(MINUS(n)(ONE));
```

```js
const elementAt = FIX((r) => (xs) => (n) =>
  IF_THEN_ELSE(EQUALS(n)(ONE))(HEAD(xs))((x) => r(TAIL(xs))(MINUS(n)(ONE))(x))
);
```

## Problem 4

Find the number of elements of a list.

```js
const length = FIX((r) => (xs) =>
  IF_THEN_ELSE(IS_EMPTY(xs))(ZERO)((x) => PLUS(ONE)(r(TAIL(xs)))(x))
);
```

```js
const ITERATE = FIX((r) => (f) => (x) => LIST_ELEMENT(x)((y) => r(f)(f(x))(y)));

const length = (xs) => SECOND(LAST(ZIP(xs)(ITERATE(SUCC)(ONE))));
```

```js
const length = COMPOSE(SECOND)(COMPOSE(LAST)(FLIP(ZIP)(ITERATE(SUCC)(ONE))));
```

```js
const length = COMPOSE(FIRST)(COMPOSE(LAST)(ZIP(ITERATE(SUCC)(ONE))));
```

```js
const length = COMPOSE(SUM_FOLD)(MAP((_) => ONE));
```

## Problem 5

Reverse a list.

```js
const reverse = FOLDL(FLIP(LIST_ELEMENT))(EMPTY_LIST);
```

```js
const reverse = (xs) =>
  FOLD((x) => (fId) => (empty) => fId(LIST_ELEMENT(x)(empty)))(ID)(xs)(
    EMPTY_LIST
  );
```

```js
const reverse = FOLDL((a) => (x) => LIST_ELEMENT(x)(a))(EMPTY_LIST);
```

## Problem 6

Find out whether a list is a palindrome.

```js
const isPalindrome = FIX((r) => (xs) =>
  IF_THEN_ELSE(OR(IS_EMPTY(xs))(EQUALS(LENGTH(xs))(ONE)))(TRUE)((x) =>
    AND(EQUALS(HEAD(xs))(LAST(xs)))(r(INIT(TAIL(xs))))(x)
  )
);
```

```js
const isPalindrome = (xs) =>
  FOLD(AND)(TRUE)(ZIP_WITH(EQUALS)(xs)(REVERSE_FOLDL(xs)));
```

```js
const isPalindrome = (xs) => AND(ZIP_WITH(EQUALS)(xs)(REVERSE_FOLDL(xs)));
```

## Problem 7

Eliminate consecutive duplicates of list elements.

```js
const DROP_WHILE = FIX((r) => (p) => (xs) =>
  IF_THEN_ELSE(IS_EMPTY(xs))(EMPTY_LIST)(
    IF_THEN_ELSE(p(HEAD(xs)))((x) => r(p)(TAIL(xs))(x))(xs)
  )
);

const compress = FIX((r) => (xs) =>
  IF_THEN_ELSE(IS_EMPTY(xs))(EMPTY_LIST)(
    LIST_ELEMENT(HEAD(xs))((x) => r(DROP_WHILE(EQUALS(HEAD(xs)))(TAIL(xs)))(x))
  )
);
```

## Problem 8

Duplicate the elements of a list.

```js
const duplicate = FIX((r) => (xs) =>
  IF_THEN_ELSE(IS_EMPTY(xs))(EMPTY_LIST)(
    LIST_ELEMENT(HEAD(xs))(LIST_ELEMENT(HEAD(xs))((x) => r(TAIL(xs))(x)))
  )
);
```

```js
const duplicate = FOLD((x) => (xs) => LIST_ELEMENT(x)(LIST_ELEMENT(x)(xs)))(
  EMPTY_LIST
);
```

```js
const duplicate = FOLDL((acc) => (x) =>
  APPEND(acc)(LIST_ELEMENT(x)(LIST_ELEMENT(x)(EMPTY_LIST)))
)(EMPTY_LIST);
```

## Problem 9

Insert an element at a given position into a list.

```js
const insertAt = FIX((r) => (x) => (xs) => (n) =>
  IF_THEN_ELSE(EQUALS(n)(ONE))(LIST_ELEMENT(x)(xs))(
    LIST_ELEMENT(HEAD(xs))((y) => r(x)(TAIL(xs))(MINUS(n)(ONE))(y))
  )
);
```
