const λ = require("./malc");
const fb = require("./fizzbuzz");
const { toFizzBuzz } = require("./utils");

const fizzBuzz = [
  1,
  2,
  "Fizz",
  4,
  "Buzz",
  "Fizz",
  7,
  8,
  "Fizz",
  "Buzz",
  11,
  "Fizz",
  13,
  14,
  "FizzBuzz",
];

describe("FIZZBUZZFUNC", () => {
  it("returns the first n FizzBuzz numbers, given a number n", () => {
    expect(toFizzBuzz(fb.FIZZBUZZFUNC(λ.RANGE(λ.ONE)(fb.FIFTEEN)))).toEqual(
      fizzBuzz
    );
  });
});

describe("FIZZBUZZFUNC_EXP", () => {
  it("returns the first n FizzBuzz numbers, given a number n", () => {
    expect(toFizzBuzz(fb.FIZZBUZZFUNC_EXP(λ.RANGE(λ.ONE)(fb.FIFTEEN)))).toEqual(
      fizzBuzz
    );
  });
});
