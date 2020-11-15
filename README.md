# malcjs - Make a Lambda Calculus

An npm package version of the [malc](https://github.com/sjsyrek/malc) project for JavaScript, including a custom Node.js REPL.

## Getting started

1. Clone this repo.
2. `npm i` to install dependencies.
3. `npm test` to run the tests.
4. `npm start` or `./malc` to start the REPL.

### Usage

The best way to learn your lambdas is to play with them in the REPL. This package provides a lightweight Node.js REPL implementation that supplies all of the included lambda functions and conversion utils as globals. You can therefore do sessions like this:

```
λ> lst = LIST_ELEMENT(ONE)(LIST_ELEMENT(TWO)(LIST_ELEMENT(THREE)(LIST_ELEMENT(FOUR)(EMPTY_LIST))))
[Function (anonymous)]
λ> toArrayInt(MAP(PLUS(ONE))(lst))
[ 2, 3, 4 ]
```

The built-in underscore `_` variable is useful for working with lambdas and translating them to and from JavaScript without having to resort to excessive wrapping of expressions. For example:

```
λ> LIST_ELEMENT(ONE)(LIST_ELEMENT(TWO)(LIST_ELEMENT(THREE)(LIST_ELEMENT(FOUR)(LIST_ELEMENT(FIVE)(EMPTY_LIST)))))
[Function (anonymous)]
λ> LIST_ELEMENT(_)(LIST_ELEMENT(_)(LIST_ELEMENT(_)(EMPTY_LIST)))
[Function (anonymous)]
λ> MAP(REVERSE)(_)
[Function (anonymous)]
λ> toArray(_).map(toArrayInt)
[ [ 5, 4, 3, 2, 1 ], [ 5, 4, 3, 2, 1 ], [ 5, 4, 3, 2, 1 ] ]
```

### REPL help commands

- `.malc` - see a list of the predefined lambda functions available in the global scope.
- `.malc <function>` - see the definition of the specified function, if it exists.
- `.utils` - see a list of the utility functions for converting lambdas to and from JavaScript.
- `.utils <function>` - see the definition of the specified utility function, if it exists.

## Learn You a Lambda Calculus

Malc is a learning tool. If you get too ambitious with these functions, they will blow up in your face. Try a complex operation on strings, and see what happens (strings are encoded as numbers and working with large lambda numbers is super inefficient). But you can nevertheless get a real feeling for how any computation, in principle, can be modeled in lambda calculus by composing functions together into more complex expressions. Just stick to basic examples.

Starting from nothing—using no built-in JavaScript features other than function application—we can encode numbers, branching, recursion, and even data structures in this interpretation of the first, smallest, and simplest programming language.

The basic building block of this implementation of malc is the JavaScript arrow function. Since JavaScript has first class functions, and these are easily written using arrow syntax, this popular language provides a simple and familiar environment in which to experiment with lambda calculus—if you can stand all the parentheses.

Try completing the included [worksheet](https://github.com/sjsyrek/malcjs/blob/master/worksheet.md), which also offers a basic walkthrough of lambda calculus and functional programming concepts.

If that's easy enough, you can work on [9 Malc Problems](https://github.com/sjsyrek/malcjs/blob/master/9-malc-problems.md). This project steals liberally from the [Haskell Prelude](https://hackage.haskell.org/package/base-4.14.0.0/docs/Prelude.html), and you are encouraged to do the same in solving these.

Consider using a TDD approach to develop new lambdas. Write tests first, following the pattern in this library, and then try to write the functions themselves. For example:

_Write a function that returns the prefix of a list of a given length and returns an empty list if the given length is 0 or when passed an empty list._

The output in the REPL should look like this:

```
λ> LIST_ELEMENT(ONE)(LIST_ELEMENT(TWO)(LIST_ELEMENT(THREE)(EMPTY_LIST)))
[Function (anonymous)]
λ> TAKE(TWO)(_)
[Function (anonymous)]
λ> toArrayInt(_)
[ 1, 2 ]
λ> TAKE(TWO)(EMPTY_LIST)
[Function (anonymous)]
λ> toArray(_)
[]
```

Here is the test we can write:

```js
describe("TAKE", () => {
  it("returns the prefix of a list of a given length", () => {
    const lst = λ.LIST_ELEMENT(λ.ONE)(
      λ.LIST_ELEMENT(λ.TWO)(λ.LIST_ELEMENT(λ.THREE)(λ.EMPTY_LIST))
    );
    const expr = λ.TAKE(λ.TWO)(lst);
    expect(toArrayInt(expr)).toEqual([1, 2]);
  });
  it("returns an empty list if the given length is 0", () => {
    const lst = λ.LIST_ELEMENT(λ.ONE)(
      λ.LIST_ELEMENT(λ.TWO)(λ.LIST_ELEMENT(λ.THREE)(λ.EMPTY_LIST))
    );
    const expr = λ.TAKE(λ.ZERO)(lst);
    expect(toArray(expr)).toEqual([]);
  });
  it("returns an empty list when passed an empty list", () => {
    const expr = λ.TAKE(λ.TWO)(λ.EMPTY_LIST);
    expect(toArray(expr)).toEqual([]);
  });
});
```

And finally, the implementation itself:

```js
const TAKE = FIX((r) => (n) => (xs) =>
  IF_THEN_ELSE(LESS_THAN_OR_EQUAL(n)(ZERO))(EMPTY_LIST)(
    IF_THEN_ELSE(IS_EMPTY(xs))
  )(EMPTY_LIST)((x) => LIST_ELEMENT(HEAD(xs))(r(MINUS(n)(ONE))(TAIL(xs)))(x))
);
```

To write this, we can use [basic Haskell functions](https://hackage.haskell.org/package/base-4.14.0.0/docs/src/GHC.List.html#take) as inspiration:

```hs
take                   :: Int -> [a] -> [a]
take n _      | n <= 0 =  []
take _ []              =  []
take n (x:xs)          =  x : take (n-1) xs
```

The first line is the type signature, which says that this function takes an `Int` value and a list of elements of some type `a` and returns a new list of elements of the same type `a`. Since we're working in plain lambda calculus, we don't care about type checking, but the signature gives us useful information for writing our own function.

Note the arrows. In Haskell, all functions are "curried" by default, so actually this is a function of type `Int -> ([a] -> [a])`, that is, it takes an `Int` and returns another unary function of type `[a] -> [a]`. Currying our functions allows us to take advantage of "partial application," or applying a multi-parameter function to one argument at a time. We can reproduce this behavior in JavaScript with consecutive arrow functions, one for each parameter.

The next three lines that all start with `take` do pattern matching on the input to the function. The left side of each equation is the input and the right side is the output for that given input. We can't do this in JavaScript ([yet](https://github.com/tc39/proposal-pattern-matching)), but we can fake it with ugly, nested `IF_THEN_ELSE` expressions.

The vertical bar in the second line is a `pattern guard`, which says "the expression on the right should only be evaluated if, given `n _` (where `_` means any value), `n` is less than or equal to `0`.

The last line is where the real action takes place—the real action, that is, of recursion. Haskell doesn't use control structures for branching or looping. Instead, conditions are evaluated as normal parts of expressions and looping is done with implicit (e.g., with `MAP` or `FOLD`) or explicit recursion. First, with the `(x:xs)`, the argument list is destructured into its head and tail. The `:` operator is the infix list constructor, equivalent to `LIST_ELEMENT`. On the right side of the equation, a new list is constructed from the original head, with the tail generated through the recursive call.

Likewise in malc, we only have an `IF_THEN_ELSE` function for branching, but for recursion we have to use a special function called `FIX`. `FIX` is a strict version of the Y combinator (sometimes called the Z combinator). This function takes a function as an argument and returns a recursive version of that same function. Technically, `FIX(f)` returns the [fixpoint](<https://en.wikipedia.org/wiki/Fixed_point_(mathematics)>) of `f`. If that fixpoint is also a function, then we get something like `FIX(f) = g`, where `g` is the fixpoint of `f` such that `f(g) = g` and `g = f(g)`, that is, another call to `f`. Since `FIX(f) = g = f(g)`, we can substitute `f(g)` anywhere we see `g`:

```
f(g) = g
f(g) = f(g)
f(g) = f(f(g))
f(g) = f(f(f(g)))
f(g) = f(f(f(f(g))))
f(g) = f(f(f(f(f(g)))))
...
```

Using `FIX`, this is equivalent to:

```
FIX(f) = g
= f(FIX(f))
= f(f(FIX(f)))
= f(f(f(FIX(f))))
...
```

And that's how you do recursion in lambda calculus. To use `FIX` in practice, first translate the recursive function directly into malc lambdas:

```js
const TAKE = (n) => (xs) =>
  IF_THEN_ELSE(LESS_THAN_OR_EQUAL(n)(ZERO))(EMPTY_LIST)(
    IF_THEN_ELSE(IS_EMPTY(xs))
  )(EMPTY_LIST)(LIST_ELEMENT(HEAD(xs))(TAKE(MINUS(n)(ONE))(TAIL(xs))));
```

Then, wrap the whole function in `FIX`. Add a parameter, e.g. `r` (or `Y`), to the beginning of the definition and replace all recursive calls to the original function with that variable:

```js
const TAKE = FIX((r) => (n) => (xs) =>
  IF_THEN_ELSE(LESS_THAN_OR_EQUAL(n)(ZERO))(EMPTY_LIST)(
    IF_THEN_ELSE(IS_EMPTY(xs))
  )(EMPTY_LIST)(LIST_ELEMENT(HEAD(xs))(r(MINUS(n)(ONE))(TAIL(xs))));
```

Finally, wrap the recursive branch of the function in a dummy closure by adding a parameter (e.g. `x`) to the front of that branch and applying the last function in the branch to the same parameter:

```js
const TAKE = FIX((r) => (n) => (xs) =>
  IF_THEN_ELSE(LESS_THAN_OR_EQUAL(n)(ZERO))(EMPTY_LIST)(
    IF_THEN_ELSE(IS_EMPTY(xs))
  )(EMPTY_LIST)((x) => LIST_ELEMENT(HEAD(xs))(r(MINUS(n)(ONE))(TAIL(xs)))(x))
);
```

Since JavaScript is a strictly-evaluated language, if we don't wrap the recursive branch in a dummy closure, it would always be evaluated and the function would never terminate. With the dummy closure, it's only evaluated until we hit the base case of the recursion.

For the curious, you can also substitute the original definitions for each of the combinators in `TAKE`, and since all we're doing is applying functions to reduce the expression to an encoded value, it will still work:

```js
const TAKE = ((f) =>
  ((x) => f((y) => x(x)(y)))((x) => f((y) => x(x)(y))))((r) => (n) => (xs) =>
  ((p) => (x) => (y) => p(x)(y))(
    ((n) => (m) =>
      ((n) => n((m) => (x) => (y) => y)((x) => (y) => x))(
        ((n) => (m) =>
          m((n) =>
            n((p) => (z) =>
              z(((n) => (f) => (x) => f(n(f)(x)))(p((x) => (y) => x)))(
                p((x) => (y) => x)
              )
            )((z) => z((f) => (x) => x)((f) => (x) => x))((x) => (y) => y)
          )(n))(n)(m)
      ))(n)((f) => (x) => x)
  )(((x) => (y) => (p) => p(x)(y))((x) => (y) => x)((x) => (y) => x))(
    ((p) => (x) => (y) => p(x)(y))(((p) => p((x) => (y) => x))(xs))
  )(((x) => (y) => (p) => p(x)(y))((x) => (y) => x)((x) => (y) => x))((x) =>
    ((x) => (xs) =>
      ((x) => (y) => (p) => p(x)(y))((x) => (y) => y)(
        ((x) => (y) => (p) => p(x)(y))(x)(xs)
      ))(
      ((xs) => ((p) => p((x) => (y) => x))(((p) => p((x) => (y) => y))(xs)))(xs)
    )(
      r(
        ((n) => (m) =>
          m((n) =>
            n((p) => (z) =>
              z(((n) => (f) => (x) => f(n(f)(x)))(p((x) => (y) => x)))(
                p((x) => (y) => x)
              )
            )((z) => z((f) => (x) => x)((f) => (x) => x))((x) => (y) => y)
          )(n))(n)((f) => (x) => f(x))
      )(
        ((xs) => ((p) => p((x) => (y) => y))(((p) => p((x) => (y) => y))(xs)))(
          xs
        )
      )
    )(x)
  )
);
```
