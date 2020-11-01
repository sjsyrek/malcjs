import { ONE, RANGE } from "./malc";
import { FIFTEEN, FIZZBUZZFUNC, FIZZBUZZFUNC_EXP } from "./fizzbuzz";
import { toFizzBuzz } from "./utils.js";

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
    expect(toFizzBuzz(FIZZBUZZFUNC(RANGE(ONE)(FIFTEEN)))).toEqual(fizzBuzz);
  });
});

describe("FIZZBUZZFUNC_EXP", () => {
  it("returns the first n FizzBuzz numbers, given a number n", () => {
    expect(toFizzBuzz(FIZZBUZZFUNC_EXP(RANGE(ONE)(FIFTEEN)))).toEqual(fizzBuzz);
  });
});
