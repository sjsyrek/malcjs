# Worksheet

## What is a function?

Consider the definition of `ID`:

```js
const ID = (x) => x;
```

This is the identity function. It's the simplest function we can imagine. It takes one argument and returns one value. For a given input value, the output value is always the same. Anywhere we see `ID` in our code, we can substitute `((x) = x)` and the result will be the same. This is called _referential transparency_.

Here's another simple function:

```js
const CONST = (x) => (y) => x;
```

`CONST` is similar to `ID` in that it will always return the `x` passed in as an argument, but it takes a second argument `y`, as well. We can use it to replace a binary function with a unary function, when we don't care about the second argument. More on that below. For now, it's worth seeing how we use the fat arrow `=>` to implement _currying_ for this function.

When a multiparameter function is curried, it is actually a series of one-argument functions, each one returning a new function that takes one more argument. `CONST` above takes an `x` and returns a new function `y => x`, in which `x` is already bound, or closed over. We can perform _partial application_ on curried functions. This is useful when you want to use a multiparameter function but fix one of the arguments.

### Exercise 1

1. Write a function that takes a binary function as input and returns the curried version of that function.
2. Write a function that _uncurries_ a two argument, curried function. Make sure you can translate back and forth between these functions.

```
λ> add = (x, y) => x + y;
[Function: add]
λ> curried = CURRY(add)
[Function (anonymous)]
λ> curried(5)(5)
10
λ> uncurried = UNCURRY(curried)
[Function (anonymous)]
λ> uncurried(5, 5)
10
λ> CURRY(uncurried)(5)(5)
10
```

## Booleans and branching

Let's invent some boolean values:

```js
const TRUE = (x) => (y) => x;

const FALSE = (x) => (y) => y;
```

These are completely arbitrary. `TRUE` takes two values and returns the first. `FALSE` takes two values and returns the second. With them, we can encode boolean values. They're still functions and illustrate that functions are themselves values. This is as primitive as we can get in lambda calculus.

With booleans, we can write predicate functions. With predicate functions, we can implement branching:

```js
const IF_THEN_ELSE = (p) => (x) => (y) => p(x)(y);
```

This a funny function. It's explicit in what it does: given a predicate function `p` that returns a boolean and two other arguments `x` and `y`, it will return `x` if `p` is `TRUE` and `y` if it is `FALSE`. We don't have branching statements in functional programming, we simply have an expression no different from any other that behaves like branching. `IF_THEN_ELSE` is funny, because you can factor out the `y`... and the `x`, leaving us with a function `p => p`. Look familiar?

### Exercise 2

1. `IF_THEN_ELSE` is identical to which other function? Why? Why does it still work for branching?
2. Study the boolean combinators. What exactly are they doing? Write some simple functions to test them.

## Numbers and arithmetic

Numbers in lambda calculus are also functions that encode, or represent, numeric values without actually _being_ numbers themselves (whatever that means).

```js
const ZERO = (f) => (x) => x;

const ONE = (f) => (x) => f(x);

const TWO = (f) => (x) => f(f(x));

const THREE = (f) => (x) => f(f(f(x)));
```

`ZERO` takes a function `f` and some other value `x` and throws `f` away. `ONE` applies `f` to `x` once. `TWO` applies `f` twice. And so on. Voila, numbers. Defining numbers this way quickly becomes tedious, however.

### Exercise 3

1. Define `ELEVEN` through `TWENTY` using various arithmetic functions.
2. Write your own versions of the functions `MAX` and `MIN`. Try writing `MAX` using `MIN`.

```
λ> MAX(ONE)(ZERO)
[Function: ONE]
λ> toInt(_)
1
λ> MIN(ONE)(ZERO)
[Function: ZERO]
λ> toInt(_)
0
```

## Composition

Function composition is fundamental to functional programming. If the return value of a function `g` can be an argument for a function `f`, then these functions can be _composed_ to form a new function. Think UNIX pipe:

```js
const COMPOSE = (f) => (g) => (x) => f(g(x));
```

It's not rocket science, but it doesn't work reliably in languages that allow side effects.

### Exercise 4

1. Write a function `LAST_ELEM` that returns the last element of a list. Use function composition.
2. Write a function `INIT` that returns all the elements of a list except the last one. Use function composition (possibly more than once).
3. Write a function `COUNTDOWN` that returns a list ordered from largest number to smallest.

```
λ> lst = RANGE(ONE)(FIVE)
[Function (anonymous)]
λ> LAST_ELEM(lst)
[Function (anonymous)]
λ> toInt(_)
5
λ> INIT(lst)
[Function (anonymous)]
λ> toArrayInt(_)
[ 1, 2, 3, 4 ]
λ> COUNTDOWN(lst)
[Function (anonymous)]
λ> toArrayInt(_)
[ 5, 4, 3, 2, 1 ]
```

## Recursion

Recursion in functional programming is also implemented using pure functions. No loops! The famous Y combinator is the secret ingredient. Since JavaScript is a strictly-evaluated language, however, we need to use the Z version:

```
Y = λf. (λx. f(x x))(λx. f(x x))
Z = λf. (λx. f(λv. x x v))(λx. f(λv. x x v))
```

Most of the recursive functions in malc operate on lists. The general pattern is repeating an operation until you hit a base case, at which point the function returns a result. You need branching to test for the base case and the `FIX` combinator (our Z) to make the recursion magic happen.

```js
const FIX = (f) => ((x) => f((y) => x(x)(y)))((x) => f((y) => x(x)(y)));
```

### Exercise 5

1. Write a function that maps a function over a list. Here's the Haskell version of this function with explicit recursion:

```hs
map :: (a -> b) -> [a] -> [b]
map _ []     = []
map f (x:xs) = f x : map f xs
```

And this is the malc version without the fixpoint combinator. Rewrite it to use `FIX`:

```js
const MAP = (f) => (xs) =>
  IF_THEN_ELSE(IS_EMPTY(xs))(EMPTY_LIST)(
    LIST_ELEMENT(f(HEAD(xs)))(MAP(f)(TAIL(xs)))
  );
```

```
λ> lst = RANGE(ONE)(FIVE)
λ> MAP(MULT(TEN))(lst)
[Function (anonymous)]
λ> toArrayInt(_)
[ 10, 20, 30, 40, 50 ]
```

1. Write `CONJ`, a function that returns the conjunction of a list of booleans.
2. Write `DISJ`, a function that returns the disjunction of a list of booleans.

```
λ> lst = LIST_ELEMENT(TRUE)(LIST_ELEMENT(TRUE)(LIST_ELEMENT(FALSE)(EMPTY_LIST)))
[Function (anonymous)]
λ> CONJ(lst)
[Function (anonymous)]
λ> toBool(_)
false
λ> lst = LIST_ELEMENT(TRUE)(LIST_ELEMENT(TRUE)(LIST_ELEMENT(TRUE)(EMPTY_LIST)))
[Function (anonymous)]
λ> CONJ(lst)
[Function (anonymous)]
λ> toBool(_)
true
λ> DISJ(lst)
[Function: TRUE]
λ> toBool(_)
true
λ> lst = LIST_ELEMENT(TRUE)(LIST_ELEMENT(TRUE)(LIST_ELEMENT(FALSE)(EMPTY_LIST)))
[Function (anonymous)]
λ> DISJ(lst)
[Function: TRUE]
λ> toBool(_)
true
λ> lst = LIST_ELEMENT(FALSE)(LIST_ELEMENT(FALSE)(LIST_ELEMENT(FALSE)(EMPTY_LIST)))
[Function (anonymous)]
λ> DISJ(lst)
[Function (anonymous)]
λ> toBool(_)
false
```

4. Write a function `ANY` that takes a predicate function and a list and returns `TRUE` if every item in the list satisfies the predicate and false otherwise. For bonus points, use `COMPOSE` and `MAP`.
5. Write `ALL` in the same way. Guess what it does.

```
λ> lst = RANGE(ONE)(FIVE)
λ> ANY(EQUALS(THREE))(lst)
[Function (anonymous)]
λ> toBool(_)
true
λ> ANY(EQUALS(SIX))(lst)
[Function (anonymous)]
λ> toBool(_)
false
λ> ALL(FLIP(GREATER_THAN)(ZERO))(lst)
[Function (anonymous)]
λ> toBool(_)
true
λ> ALL(FLIP(GREATER_THAN)(FIVE))(lst)
[Function: FALSE]
λ> toBool(_)
false
```

6. Write `UNTIL`, which applies a function to a value until a condition is met. Here's the Haskell version:

```hs
until :: (a -> Bool) -> (a -> a) -> a -> a
until p f = go
  where
     go x | p x       = x
          | otherwise = go (f x)
```

```
λ> lst = RANGE(ONE)(FIVE)
λ> UNTIL(xs => EQUALS(HEAD(xs))(FIVE))(MAP(PLUS(ONE)))(lst)
[Function (anonymous)]
λ> toArrayInt(_)
[ 5, 6, 7, 8, 9 ]
λ> UNTIL(xs => EQUALS(LENGTH(xs))(TEN))(PUSH(ONE))(lst)
[Function (anonymous)]
λ> toArrayInt(_)
[
  1, 2, 3, 4, 5,
  1, 1, 1, 1, 1
]
```

## Data structures

Data structures are encoded in lambda calculus as... functions! Malc includes pairs (or tuples), linked lists, and binary trees. If you felt like it, you could implement any other data structure you like since they're pretty much all just generalizations of lists.

### Exercise 6

1. Write a function that returns a pair of `DIV` and `MOD`.
2. Write `UNLIST`, a function that takes a list and returns a pair of its head and tail.

```
λ> DIVMOD(TEN)(TWO)
[Function (anonymous)]
λ> printPairInt(_)
'(5,0)'
λ> lst = RANGE(ONE)(FIVE)
λ> UNLIST(lst)
[Function (anonymous)]
λ> { fst: toInt(toPair(_).fst), snd: toArrayInt(toPair(_).snd)}
{ fst: 1, snd: [ 2, 3, 4, 5 ] }
```

3. Write a function to insert a value into a binary tree. Here's the Haskell version:

```hs
insert :: a -> BinaryTree a -> BinaryTree a
insert b Leaf = Node Leaf b Leaf
insert b (Node left a right)
  | b == a = Node left a right
  | b < a = Node (insert b left) a right
  | b > a = Node left a (insert b right)
```

```
λ> tree = NODE(TWO)(NODE(ONE)(EMPTY_TREE)(EMPTY_TREE))(NODE(THREE)(EMPTY_TREE)(EMPTY_TREE))
[Function (anonymous)]
λ> printTreeInt(_)
'[2, [1, [], []], [3, [], []]]'
λ> INSERT_TREE(FIVE)(tree)
[Function (anonymous)]
λ> printTreeInt(_)
'[2, [1, [], []], [3, [], [5, [], []]]]'
λ> INSERT_TREE(ZERO)(tree)
[Function (anonymous)]
λ> printTreeInt(_)
'[2, [1, [0, [], []], []], [3, [], []]]'
```

## Folding at home

_Folds_ are essential ingredients of functional programs. The fold function is sometimes called _reduce_ in various programming languages (including JavaScript), as it "reduces" a data structure to a summary value, which can also be of the same type as the original data structure. `FOLD` takes a binary function, a starting accumulator value, and a list of values and returns a final, "folded" value. Here is what the "right fold" function looks like in Haskell (note the polymorphic type variables in the signature):

```hs
foldr :: (a -> b -> b) -> b -> [a] -> b
foldr f z [] = z
foldr f z (x:xs) = f x (foldr f z xs)
```

And here is the malc version:

```js
const FOLD = FIX((r) => (f) => (z) => (xs) =>
  IF_THEN_ELSE(IS_EMPTY(xs))(z)((x) => f(HEAD(xs))(r(f)(z)(TAIL(xs)))(x))
);
```

Malc also comes with `FOLDL`, an implementation of the left fold function, `foldl`, from Haskell, which is more efficient for certain operations and behaves differently than the right fold, `foldr`. We aren't too worried about efficiently in malc, however, so it's more important to focus on folding in general than on right vs. left folds.

Folds have an interesting property: any function on lists that uses explicit recursion with a base case can be rewritten as a fold. This property is better expressed in pseudo-code than words:

```
g []     = v
g (x:xs) = f x (g xs)
```

Is equvalent to:

```
g = fold f v
```

You probably want an example. Let's take `MAP`. Above, we defined it using explicit recursion. If we want to use `FOLD`, we need to pass it a function that constructs a list _and_ the function to map. Sounds like a job for `COMPOSE`. Given the following values for `f` and `v` from the equations above:

```hs
f = (:) . f
v = []
```

We can write `MAP` as a fold. In Haskell, it would be `foldr ((:) . f) []`. Composition is nice and easy in Haskell. In malc, however, we don't have an infix operator for composition:

```js
const MAP = (f) => FOLD(COMPOSE(LIST_ELEMENT)(f))(EMPTY_LIST);
```

How about another example? Let's say we want to sum up a list of numbers. We can do this very naively with explicit recursion:

```hs
sum []     = 0
sum (x:xs) = x + (sum xs)
```

```js
const SUM = FIX((r) => (xs) =>
  IF_THEN_ELSE(IS_EMPTY(xs))(ZERO)((x) => PLUS(HEAD(xs))(r(TAIL(xs)))(x))
);
```

But it's so much nicer and less verbose to use a fold:

```hs
sum = foldr (+) 0
```

```js
const SUM = FOLD(PLUS)(ZERO);
```

It's also worth pointing out that the fold version of the function is _pointfree_. That is, it doesn't bind any arguments of its own. The list that `SUM` takes is implicit, because it's already the last argument of `FOLD`. We simply factored it out. We could write the function as `xs => FOLD(PLUS)(ZERO)(xs)`, but the argument is redundant and doesn't communicate anything we don't already know: we're folding over a list.

If we wanted to sum a list and also perform some other operation, say add 1 to the final result, we can just use composition and the help of the property we defined above. The messy Haskell version using explicit recursion would require these ugly equations:

```hs
((+1) · sum) [] = 1
((+1) · sum) (x:xs) = (+) x (((+1) · sum) xs)
```

But with a fold, this becomes:

```hs
foldr (+) 1
```

Or in malc:

```js
FOLD(PLUS)(ONE);
```

Try it in the REPL, and see for yourself. Try some other functions while you're at it. It's important to learn how to fold.

There's more. Remember `CONST`? It may seem useless, but imagine that the first argument `x` is some kind of environment or configuration that you want to define elsewhere and maintain in a constant form. You can then apply that configuration to a program and throw the result away. For example, here are three possible ways to write a function that computes the length of a list:

```js
const LENGTH = (xs) =>
  FIX((r) => (xs) => (n) =>
    IF_THEN_ELSE(IS_EMPTY(xs))(n)((x) => r(TAIL(xs))(SUCC(n))(x))
  )(xs)(ZERO);

const LENGTH_FOLD = FOLD((x) => (n) => PLUS(ONE)(n))(ZERO);

const LENGTH_CONST = FOLD(CONST(PLUS(ONE)))(ZERO);
```

The first is a complete, explicitly recursive definition. The second uses a fold. The third is the same fold, but dispenses with the arguments, which we don't really need, because we don't care about intermediate values—only the final result. What we need is a function that adds one to each successive iteration of the implicit recursion. Since `FOLD` itself requires a binary function as its first parameter, `CONST` is fit for purpose.

### Exercise 7

1. Write `MAXIMUM` and `MINIMUM`. Use `FOLD`.

```
λ> lst = RANGE(ONE)(FIVE)
[Function (anonymous)]
λ> MAXIMUM(lst)
[Function (anonymous)]
λ> toInt(_)
5
λ> MINIMUM(lst)
[Function (anonymous)]
λ> toInt(_)
1
```

2. Write `CONJ` and `DISJ` using `FOLD`.
3. Write `APPEND` as a fold.

```js
const APPEND = FIX((r) => (xs) => (ys) =>
  IF_THEN_ELSE(IS_EMPTY(xs))(ys)((x) =>
    LIST_ELEMENT(HEAD(xs))(r(TAIL(xs))(ys))(x)
  )
);
```

```
λ> lst1 = RANGE(ONE)(FIVE)
[Function (anonymous)]
λ> lst2 = RANGE(SIX)(TEN)
[Function (anonymous)]
λ> APPEND_FOLD(lst1)(lst2)
[Function (anonymous)]
λ> toArrayInt(_)
[
  1, 2, 3, 4,  5,
  6, 7, 8, 9, 10
]
```

### Final Exercise

Write a function to solve the FizzBuzz problem. Try mapping over a list of consecutive numbers, since there's no standard output in the world of malc. And 1-15 is probably enough. You can experiment with higher numbers, but the usual 100 will take... awhile.

```
λ> lst = RANGE(ONE)(FIFTEEN)
[Function (anonymous)]
λ> FIZZBUZZFUNC(lst)
[Function (anonymous)]
λ> toFizzBuzz(_)
[
  1,          2,
  'Fizz',     4,
  'Buzz',     'Fizz',
  7,          8,
  'Fizz',     'Buzz',
  11,         'Fizz',
  13,         14,
  'FizzBuzz'
]
```

## Solutions

```js
CURRY = (f) => (x) => (y) => f(x, y);

UNCURRY = (f) => (x, y) => f(x)(y);

MAX = (x) => (y) => IF_THEN_ELSE(EQUALS(MIN(x)(y))(x))(y)(x);

LAST_ELEM = COMPOSE(HEAD)(REVERSE);

INIT = COMPOSE(REVERSE)(COMPOSE(TAIL)(REVERSE));

COUNTDOWN = COMPOSE(REVERSE)(SORT);

MAP = FIX((r) => (f) => (xs) =>
  IF_THEN_ELSE(IS_EMPTY(xs))(EMPTY_LIST)((x) =>
    LIST_ELEMENT(f(HEAD(xs)))(r(f)(TAIL(xs)))(x)
  )
);

CONJ = FIX((r) => (xs) =>
  IF_THEN_ELSE(IS_EMPTY(xs))(TRUE)(AND(HEAD(xs))((x) => r(TAIL(xs))(x)))
);

DISJ = FIX((r) => (xs) =>
  IF_THEN_ELSE(IS_EMPTY(xs))(FALSE)(OR(HEAD(xs))((x) => r(TAIL(xs))(x)))
);

ANY = (p) => COMPOSE(DISJ)(MAP(p));

ALL = (p) => COMPOSE(CONJ)(MAP(p));

UNTIL = (p) => (f) =>
  FIX((r) => (x) => IF_THEN_ELSE(p(x))(x)((y) => r(f(x))(y)));

DIVMOD = (n) => (m) => PAIR(DIV(n)(m))(MOD(n)(m));

UNLIST = (xs) =>
  IF_THEN_ELSE(IS_EMPTY(xs))(EMPTY_LIST)(PAIR(HEAD(xs))(TAIL(xs)));

INSERT_TREE = FIX((r) => (v) => (t) =>
  IF_THEN_ELSE(IS_EMPTY(t))(NODE(v)(EMPTY_TREE)(EMPTY_TREE))(
    IF_THEN_ELSE(EQUALS(v)(VALUE(t)))(NODE(VALUE(t))(LEFT(t))(RIGHT(t)))((x) =>
      IF_THEN_ELSE(LESS_THAN(v)(VALUE(t)))(
        NODE(VALUE(t))(r(v)(LEFT(t)))(RIGHT(t))
      )(NODE(VALUE(t))(LEFT(t))(r(v)(RIGHT(t))))(x)
    )
  )
);

MAXIMUM = (xs) => FOLD(MAX)(HEAD(xs))(TAIL(xs));

MINIMUM = (xs) => FOLD(MIN)(HEAD(xs))(TAIL(xs));

CONJ_FOLD = FOLD(AND)(TRUE);

DISJ_FOLD = FOLD(OR)(FALSE);

APPEND_FOLD = (xs) => (ys) => FOLD(LIST_ELEMENT)(ys)(xs);

FIZZBUZZFUNC = MAP((n) =>
  IF_THEN_ELSE(IS_ZERO(MOD(n)(FIFTEEN)))(FIZZBUZZ)(
    IF_THEN_ELSE(IS_ZERO(MOD(n)(THREE)))(FIZZ)(
      IF_THEN_ELSE(IS_ZERO(MOD(n)(FIVE)))(BUZZ)(n)
    )
  )
);
```
