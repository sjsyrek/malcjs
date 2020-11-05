# Malc

## Make a lambda calculus

An npm package version of the [malc](https://github.com/sjsyrek/malc) project for JavaScript.

### Installation

1. Clone this repo.
2. `npm i` to install dependencies.
3. `npm test` to run the tests.
4. `npm run build` to compile the project.
5. `npm start` to start the REPL.

### Usage

The best way to learn your lambdas is to play with them in a REPL. This package provides a very light node REPL implementation that supplies all of the included lambda functions and utils as globals. You can therefore do sessions like this:

```js
λ myArray = fromArrayInt([1,2,3])
[Function (anonymous)]
λ myNewArray = MAP(PLUS(ONE))(myArray)
[Function (anonymous)]
λ toArrayInt(myNewArray)
[ 2, 3, 4 ]
```
