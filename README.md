# Malc

## Make a lambda calculus

An npm package version of the [malc](https://github.com/sjsyrek/malc) project for JavaScript.

### Getting started

1. Clone this repo.
2. `npm i` to install dependencies.
3. `npm test` to run the tests.
4. `npm start` or `./malc` to start the REPL.

### Usage

The best way to learn your lambdas is to play with them in a REPL. This package provides a lightweight node REPL implementation that supplies all of the included lambda functions and utils as globals. You can therefore do sessions like this:

```sh
λ> lst = LIST_ELEMENT(ONE)(LIST_ELEMENT(TWO)(LIST_ELEMENT(THREE)(LIST_ELEMENT(FOUR)(EMPTY_LIST))))
λ> toArrayInt(MAP(PLUS(ONE))(lst))
[ 2, 3, 4 ]
```

The built-in underscore `_` variable is useful for working with lambdas and translating them to and from JavaScript:

```sh
λ> LIST_ELEMENT(ONE)(LIST_ELEMENT(TWO)(LIST_ELEMENT(THREE)(LIST_ELEMENT(FOUR)(LIST_ELEMENT(FIVE)(EMPTY_LIST)))))
λ> LIST_ELEMENT(_)(LIST_ELEMENT(_)(LIST_ELEMENT(_)(EMPTY_LIST)))
λ> MAP(REVERSE)(_)
λ> toArray(_).map(toArrayInt)
[ [ 5, 4, 3, 2, 1 ], [ 5, 4, 3, 2, 1 ], [ 5, 4, 3, 2, 1 ] ]
```

### REPL help commands

- `.malc` - see a list of the predefined lambda functions available in the global scope.
- `.malc <function>` - see the definition of the specified function, if it exists.
- `.utils` - see a list of the utility functions for converting lambdas to and from JavaScript.
- `.utils <function>` - see the definition of the specified utility function, if it exists.
