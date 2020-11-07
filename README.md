# Malc

## Make a lambda calculus

An npm package version of the [malc](https://github.com/sjsyrek/malc) project for JavaScript.

### Getting started

1. Clone this repo.
2. `npm i` to install dependencies.
3. `npm test` to run the tests.
4. `npm run build` to compile the project.
5. `npm start` to start the REPL.
6. `./malc` to compile and run the REPL from the command line.

### Usage

The best way to learn your lambdas is to play with them in a REPL. This package provides a lightweight node REPL implementation that supplies all of the included lambda functions and utils as globals. You can therefore do sessions like this:

```sh
λ> lst = LIST_ELEMENT(ONE)(LIST_ELEMENT(TWO)(LIST_ELEMENT(THREE)(LIST_ELEMENT(FOUR)(EMPTY_LIST))))
λ> toArrayInt(MAP(PLUS(ONE))(lst))
[ 2, 3, 4 ]
```

### REPL help commands

- `.malc` - see a list of the predefined lambda functions available in the global scope
- `.malc <function>` - see the definition of the specified function, if it exists (ES5)
- `.utils` - see a list of the utility functions for converting lambdas to and from JavaScript
- `.utils <function>` - see the definition of the specified utility function, if it exists (ES5)
