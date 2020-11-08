const λ = require("./malc");
const {
  fromString,
  toArray,
  toArrayInt,
  toBool,
  toInt,
  toPair,
  toPairInt,
  toString,
  toTreeInt,
} = require("./utils");

describe("ID", () => {
  it("returns the argument passed into it", () => {
    expect(toInt(λ.ID(λ.ONE))).toBe(1);
    expect(λ.ID(1)).toBe(1);
    expect(toBool(λ.TRUE)).toBe(true);
  });
});

describe("TRUE", () => {
  it("evaluates to true", () => {
    expect(toBool(λ.TRUE)).toBe(true);
  });
});

describe("FALSE", () => {
  it("evaluates to false", () => {
    expect(toBool(λ.FALSE)).toBe(false);
  });
});

describe("AND", () => {
  it("evaluates to true if both of its arguments are true", () => {
    expect(toBool(λ.AND(λ.TRUE)(λ.TRUE))).toBe(true);
  });
  it("evaluates to false if either of its arguments is false", () => {
    expect(toBool(λ.AND(λ.TRUE)(λ.FALSE))).toBe(false);
    expect(toBool(λ.AND(λ.FALSE)(λ.TRUE))).toBe(false);
    expect(toBool(λ.AND(λ.FALSE)(λ.FALSE))).toBe(false);
  });
});

describe("OR", () => {
  it("evaluates to true if either of its arguments is true", () => {
    expect(toBool(λ.OR(λ.TRUE)(λ.FALSE))).toBe(true);
    expect(toBool(λ.OR(λ.FALSE)(λ.TRUE))).toBe(true);
    expect(toBool(λ.OR(λ.TRUE)(λ.TRUE))).toBe(true);
  });
  it("evaluates to false if both of its arguments are false", () => {
    expect(toBool(λ.OR(λ.FALSE)(λ.FALSE))).toBe(false);
  });
});

describe("NOT", () => {
  it("evaluates to true if its argument is false", () => {
    expect(toBool(λ.NOT(λ.FALSE))).toBe(true);
  });
  it("evaluates to false if its argument is true", () => {
    expect(toBool(λ.NOT(λ.TRUE))).toBe(false);
  });
});

describe("XOR", () => {
  it("evaluates to true if one of its arguments is true", () => {
    expect(toBool(λ.XOR(λ.TRUE)(λ.FALSE))).toBe(true);
    expect(toBool(λ.XOR(λ.FALSE)(λ.TRUE))).toBe(true);
  });
  it("evaluates to false if both of its arguments are true or both are false", () => {
    expect(toBool(λ.XOR(λ.TRUE)(λ.TRUE))).toBe(false);
    expect(toBool(λ.XOR(λ.FALSE)(λ.FALSE))).toBe(false);
  });
});

describe("IF_THEN_ELSE", () => {
  const p = λ.LESS_THAN(λ.ONE)(λ.TWO);
  it("evaluates the first branch if the predicate is true", () => {
    expect(toInt(λ.IF_THEN_ELSE(p)(λ.ONE)(λ.TWO))).toBe(1);
  });
  it("evaluates the second branch if the predicate is false", () => {
    expect(toInt(λ.IF_THEN_ELSE(λ.NOT(p))(λ.ONE)(λ.TWO))).toBe(2);
  });
});

describe("ZERO", () => {
  it("evaluates to 0", () => {
    expect(toInt(λ.ZERO)).toBe(0);
  });
});

describe("ONE", () => {
  it("evaluates to 1", () => {
    expect(toInt(λ.ONE)).toBe(1);
  });
});

describe("TWO", () => {
  it("evaluates to 2", () => {
    expect(toInt(λ.TWO)).toBe(2);
  });
});

describe("THREE", () => {
  it("evaluates to 3", () => {
    expect(toInt(λ.THREE)).toBe(3);
  });
});

describe("FOUR", () => {
  it("evaluates to 4", () => {
    expect(toInt(λ.FOUR)).toBe(4);
  });
});

describe("FIVE", () => {
  it("evaluates to 5", () => {
    expect(toInt(λ.FIVE)).toBe(5);
  });
});

describe("SIX", () => {
  it("evaluates to 6", () => {
    expect(toInt(λ.SIX)).toBe(6);
  });
});

describe("SEVEN", () => {
  it("evaluates to 7", () => {
    expect(toInt(λ.SEVEN)).toBe(7);
  });
});

describe("EIGHT", () => {
  it("evaluates to 8", () => {
    expect(toInt(λ.EIGHT)).toBe(8);
  });
});

describe("NINE", () => {
  it("evaluates to 9", () => {
    expect(toInt(λ.NINE)).toBe(9);
  });
});

describe("TEN", () => {
  it("evaluates to 10", () => {
    expect(toInt(λ.TEN)).toBe(10);
  });
});

describe("SUCC", () => {
  it("returns the next natural number after the argument", () => {
    expect(toInt(λ.SUCC(λ.ZERO))).toBe(1);
    expect(toInt(λ.SUCC(λ.ONE))).toBe(2);
    expect(toInt(λ.SUCC(λ.TWO))).toBe(3);
  });
});

describe("PRED", () => {
  it("returns the previous natural number before the argument", () => {
    expect(toInt(λ.PRED(λ.THREE))).toBe(2);
    expect(toInt(λ.PRED(λ.TWO))).toBe(1);
    expect(toInt(λ.PRED(λ.ONE))).toBe(0);
  });
});

describe("PLUS", () => {
  it("returns the sum of the two arguments", () => {
    expect(toInt(λ.PLUS(λ.ZERO)(λ.ONE))).toBe(1);
    expect(toInt(λ.PLUS(λ.ONE)(λ.ONE))).toBe(2);
    expect(toInt(λ.PLUS(λ.ONE)(λ.TWO))).toBe(3);
  });
});

describe("MINUS", () => {
  it("returns the difference of the two arguments", () => {
    expect(toInt(λ.MINUS(λ.ONE)(λ.ONE))).toBe(0);
    expect(toInt(λ.MINUS(λ.ONE)(λ.ZERO))).toBe(1);
    expect(toInt(λ.MINUS(λ.TWO)(λ.ONE))).toBe(1);
  });
  it("returns 0 if the difference would be a negative number", () => {
    expect(toInt(λ.MINUS(λ.ZERO)(λ.ONE))).toBe(0);
  });
});

describe("MULT", () => {
  it("returns the product of the two arguments", () => {
    expect(toInt(λ.MULT(λ.ONE)(λ.ZERO))).toBe(0);
    expect(toInt(λ.MULT(λ.ONE)(λ.ONE))).toBe(1);
    expect(toInt(λ.MULT(λ.TWO)(λ.ONE))).toBe(2);
    expect(toInt(λ.MULT(λ.TWO)(λ.TWO))).toBe(4);
  });
});

describe("EXP", () => {
  it("given a base x and power y, returns the exponent of x^y", () => {
    expect(toInt(λ.EXP(λ.ZERO)(λ.ONE))).toBe(0);
    expect(toInt(λ.EXP(λ.ZERO)(λ.ZERO))).toBe(1);
    expect(toInt(λ.EXP(λ.ONE)(λ.ZERO))).toBe(1);
    expect(toInt(λ.EXP(λ.ONE)(λ.ONE))).toBe(1);
    expect(toInt(λ.EXP(λ.ONE)(λ.TWO))).toBe(1);
    expect(toInt(λ.EXP(λ.TWO)(λ.TWO))).toBe(4);
  });
});

describe("IS_ZERO", () => {
  it("returns true if the argument is 0", () => {
    expect(toBool(λ.IS_ZERO(λ.ZERO))).toBe(true);
  });
  it("returns false if the argument is not 0", () => {
    expect(toBool(λ.IS_ZERO(λ.ONE))).toBe(false);
  });
});

describe("EQUALS", () => {
  it("returns true if the first argument is equal to the second argument", () => {
    expect(toBool(λ.EQUALS(λ.ZERO)(λ.ZERO))).toBe(true);
  });
  it("returns false if the first argument is not equal to the second argument", () => {
    expect(toBool(λ.EQUALS(λ.ZERO)(λ.ONE))).toBe(false);
  });
});

describe("LESS_THAN_OR_EQUAL", () => {
  it("returns true if the first argument is less than or equal to the second argument", () => {
    expect(toBool(λ.LESS_THAN_OR_EQUAL(λ.ZERO)(λ.ZERO))).toBe(true);
    expect(toBool(λ.LESS_THAN_OR_EQUAL(λ.ZERO)(λ.ONE))).toBe(true);
  });
  it("returns false if the first argument is greater than the second argument", () => {
    expect(toBool(λ.LESS_THAN_OR_EQUAL(λ.ONE)(λ.ZERO))).toBe(false);
  });
});

describe("LESS_THAN", () => {
  it("returns true if the first argument is less than the second argument", () => {
    expect(toBool(λ.LESS_THAN(λ.ZERO)(λ.ONE))).toBe(true);
  });
  it("returns false if the first argument is greater than or equal to the second argument", () => {
    expect(toBool(λ.LESS_THAN(λ.ZERO)(λ.ZERO))).toBe(false);
    expect(toBool(λ.LESS_THAN(λ.ONE)(λ.ZERO))).toBe(false);
  });
});

describe("GREATER_THAN_OR_EQUAL", () => {
  it("returns true if the first argument is greater than or equal to the second argument", () => {
    expect(toBool(λ.GREATER_THAN_OR_EQUAL(λ.ONE)(λ.ZERO))).toBe(true);
    expect(toBool(λ.GREATER_THAN_OR_EQUAL(λ.ZERO)(λ.ZERO))).toBe(true);
  });
  it("returns false if the first argument is less than the second argument", () => {
    expect(toBool(λ.GREATER_THAN_OR_EQUAL(λ.ZERO)(λ.ONE))).toBe(false);
  });
});

describe("GREATER_THAN", () => {
  it("returns true if the first argument is greater than the second argument", () => {
    expect(toBool(λ.GREATER_THAN(λ.ONE)(λ.ZERO))).toBe(true);
  });
  it("returns false if the first argument is less than or equal to the second argument", () => {
    expect(toBool(λ.GREATER_THAN(λ.ZERO)(λ.ONE))).toBe(false);
    expect(toBool(λ.GREATER_THAN(λ.ZERO)(λ.ZERO))).toBe(false);
  });
});

describe("MAX", () => {
  it("returns the greater of the two arguments", () => {
    expect(toInt(λ.MAX(λ.ONE)(λ.ZERO))).toBe(1);
    expect(toInt(λ.MAX(λ.ZERO)(λ.ZERO))).toBe(0);
  });
});

describe("MIN", () => {
  it("returns the lesser of the two arguments", () => {
    expect(toInt(λ.MIN(λ.ONE)(λ.ZERO))).toBe(0);
    expect(toInt(λ.MIN(λ.ZERO)(λ.ZERO))).toBe(0);
  });
});

describe("COMPOSE", () => {
  it("returns the composition of two functions", () => {
    const f = λ.EQUALS(λ.ONE);
    const g = (x) => λ.EXP(x)(λ.ZERO);
    const expr = λ.COMPOSE(f)(g)(λ.THREE);
    expect(toBool(expr)).toBe(true);
  });
});

describe("FLIP", () => {
  it("swaps the parameters of a binary function", () => {
    const expr = λ.FLIP(λ.GREATER_THAN(λ.TWO)(λ.THREE));
    expect(toBool(λ.GREATER_THAN(λ.TWO)(λ.THREE))).toBe(false);
    expect(toBool(expr)).toBe(true);
  });
});

describe("MOD", () => {
  it("returns the first argument modulo the second argument", () => {
    expect(toInt(λ.MOD(λ.THREE)(λ.TWO))).toBe(1);
  });
  it("throws an error when the second argument is 0", () => {
    expect(() => toInt(λ.MOD(λ.THREE)(λ.ZERO))).toThrowError(RangeError);
  });
});

describe("DIV", () => {
  it("returns the first argument divided by the second argument, dropping the remainder", () => {
    expect(toInt(λ.DIV(λ.MULT(λ.TWO)(λ.THREE))(λ.THREE))).toBe(2);
    expect(toInt(λ.DIV(λ.THREE)(λ.THREE))).toBe(1);
  });
  it("throws an error when the second argument is 0", () => {
    expect(() => toInt(λ.DIV(λ.THREE)(λ.ZERO))).toThrowError(RangeError);
  });
});

describe("EVEN", () => {
  it("returns true if the argument is even", () => {
    expect(toBool(λ.EVEN(λ.TWO))).toBe(true);
  });
  it("returns false if the argument is odd", () => {
    expect(toBool(λ.EVEN(λ.ONE))).toBe(false);
  });
});

describe("ODD", () => {
  it("returns true if the argument is odd", () => {
    expect(toBool(λ.ODD(λ.ONE))).toBe(true);
  });
  it("returns false if the argument is odd", () => {
    expect(toBool(λ.ODD(λ.TWO))).toBe(false);
  });
});

describe("PAIR", () => {
  const tuple = {
    fst: 1,
    snd: 2,
  };
  it("creates a 2-tuple", () => {
    expect(toPairInt(λ.PAIR(λ.ONE)(λ.TWO))).toEqual(tuple);
    expect(toPair(λ.PAIR(1)(2))).toEqual(tuple);
  });
});

describe("FIRST", () => {
  it("selects the first element of a tuple", () => {
    const expr = λ.FIRST(λ.PAIR(λ.ONE)(λ.TWO));
    expect(toInt(expr)).toBe(1);
  });
});

describe("SECOND", () => {
  it("selects the second element of a tuple", () => {
    const expr = λ.SECOND(λ.PAIR(λ.ONE)(λ.TWO));
    expect(toInt(expr)).toBe(2);
  });
});

describe("SWAP", () => {
  const tuple = {
    fst: 2,
    snd: 1,
  };
  it("swaps the two elements of a tuple", () => {
    const expr = λ.SWAP(λ.PAIR(λ.ONE)(λ.TWO));
    expect(toPairInt(expr)).toEqual(tuple);
  });
});

describe("LIST_ELEMENT", () => {
  it("appends an element to the beginning of a list", () => {
    const lst = λ.LIST_ELEMENT(λ.TWO)(λ.LIST_ELEMENT(λ.THREE)(λ.EMPTY_LIST));
    const expr = λ.LIST_ELEMENT(λ.ONE)(lst);
    expect(toArrayInt(expr)).toEqual([1, 2, 3]);
  });
  it("can be used to construct arbitrary strings", () => {
    const str = "String!";
    const expr = fromString(str);
    expect(toString(expr)).toBe(str);
    expect(toArrayInt(expr)).toEqual([83, 116, 114, 105, 110, 103, 33]);
  });
});

describe("EMPTY_LIST", () => {
  it("creates an empty list", () => {
    expect(toArray(λ.EMPTY_LIST)).toEqual([]);
  });
});

describe("IS_EMPTY", () => {
  it("returns true if a list is empty", () => {
    const expr = λ.IS_EMPTY(λ.EMPTY_LIST);
    expect(toBool(expr)).toBe(true);
  });
  it("returns false if a list is not empty", () => {
    const expr = λ.IS_EMPTY(λ.LIST_ELEMENT(λ.ONE)(λ.EMPTY_LIST));
    expect(toBool(expr)).toBe(false);
  });
});

describe("HEAD", () => {
  it("returns the head of a list", () => {
    const expr = λ.HEAD(λ.LIST_ELEMENT(λ.ONE)(λ.EMPTY_LIST));
    expect(toInt(expr)).toBe(1);
  });
  it("returns an empty list if the list is empty", () => {
    const expr = λ.HEAD(λ.EMPTY_LIST);
    expect(toArray(expr)).toEqual([]);
  });
});

describe("TAIL", () => {
  it("returns the tail of a list", () => {
    const expr = λ.TAIL(
      λ.LIST_ELEMENT(λ.ONE)(
        λ.LIST_ELEMENT(λ.TWO)(λ.LIST_ELEMENT(λ.THREE)(λ.EMPTY_LIST))
      )
    );
    expect(toArrayInt(expr)).toEqual([2, 3]);
  });
  it("returns an empty list when the argument is a singleton", () => {
    const expr = λ.TAIL(λ.LIST_ELEMENT(λ.ONE)(λ.EMPTY_LIST));
    expect(toArray(expr)).toEqual([]);
  });
});

describe("FOLD", () => {
  const lst = λ.LIST_ELEMENT(λ.ONE)(
    λ.LIST_ELEMENT(λ.TWO)(λ.LIST_ELEMENT(λ.THREE)(λ.EMPTY_LIST))
  );
  it("reduces a list to a summary value (monoidal addition)", () => {
    const expr = λ.FOLD(λ.PLUS)(λ.ZERO)(lst);
    expect(toInt(expr)).toBe(6);
  });
  it("reduces a list to a summary value (composition of list constructor)", () => {
    const f = λ.COMPOSE(λ.LIST_ELEMENT)(λ.PLUS(λ.ONE));
    const expr = λ.FOLD(f)(λ.EMPTY_LIST)(lst);
    expect(toArrayInt(expr)).toEqual([2, 3, 4]);
  });
});

describe("MAP", () => {
  const lst = λ.LIST_ELEMENT(λ.ONE)(
    λ.LIST_ELEMENT(λ.TWO)(λ.LIST_ELEMENT(λ.THREE)(λ.EMPTY_LIST))
  );
  it("maps a function over a list (functorial addition)", () => {
    const expr = λ.MAP(λ.PLUS(λ.ONE))(lst);
    expect(toArrayInt(expr)).toEqual([2, 3, 4]);
  });
  it("maps a function over a list (multi-dimensional lists)", () => {
    const expr = λ.MAP(λ.HEAD)(
      λ.LIST_ELEMENT(lst)(
        λ.LIST_ELEMENT(λ.MAP(λ.PLUS(λ.ONE))(lst))(λ.EMPTY_LIST)
      )
    );
    expect(toArrayInt(expr)).toEqual([1, 2]);
  });
});

describe("FILTER", () => {
  const lst = λ.LIST_ELEMENT(λ.ONE)(
    λ.LIST_ELEMENT(λ.TWO)(λ.LIST_ELEMENT(λ.THREE)(λ.EMPTY_LIST))
  );
  it("filters a list against a predicate (pointfree)", () => {
    const expr = λ.FILTER(λ.ODD)(lst);
    expect(toArrayInt(expr)).toEqual([1, 3]);
  });
  it("filters a list against a predicate (with lambda)", () => {
    const p = (x) => λ.GREATER_THAN(x)(λ.ONE);
    const expr = λ.FILTER(p)(lst);
    expect(toArrayInt(expr)).toEqual([2, 3]);
  });
  it("filters a list against a predicate (pointfree with flip)", () => {
    const p = λ.FLIP(λ.GREATER_THAN)(λ.ONE);
    const expr = λ.FILTER(p)(lst);
    expect(toArrayInt(expr)).toEqual([2, 3]);
  });
});

describe("RANGE", () => {
  it("creates a list of numbers from a given range", () => {
    const expr = λ.RANGE(λ.ONE)(λ.THREE);
    expect(toArrayInt(expr)).toEqual([1, 2, 3]);
  });
});

describe("INDEX", () => {
  it("returns the element from a list at a given index", () => {
    const lst = λ.LIST_ELEMENT(λ.ONE)(
      λ.LIST_ELEMENT(λ.TWO)(λ.LIST_ELEMENT(λ.THREE)(λ.EMPTY_LIST))
    );
    const expr = λ.INDEX(lst)(λ.ONE);
    expect(toInt(expr)).toBe(2);
  });
});

describe("PUSH", () => {
  it("inserts an element at the end of a list", () => {
    const lst = λ.LIST_ELEMENT(λ.ONE)(λ.LIST_ELEMENT(λ.TWO)(λ.EMPTY_LIST));
    const expr = λ.PUSH(λ.THREE)(lst);
    expect(toArrayInt(expr)).toEqual([1, 2, 3]);
    expect(toArrayInt(λ.PUSH(λ.ONE)(λ.EMPTY_LIST))).toEqual([1]);
  });
});

describe("APPEND", () => {
  it("concatenates two lists", () => {
    const lst = λ.LIST_ELEMENT(λ.ONE)(
      λ.LIST_ELEMENT(λ.TWO)(λ.LIST_ELEMENT(λ.THREE)(λ.EMPTY_LIST))
    );
    const expr = λ.APPEND(lst)(lst);
    expect(toArrayInt(expr)).toEqual([1, 2, 3, 1, 2, 3]);
    expect(toArrayInt(λ.APPEND(λ.EMPTY_LIST)(lst))).toEqual([1, 2, 3]);
    expect(toArrayInt(λ.APPEND(lst)(λ.EMPTY_LIST))).toEqual([1, 2, 3]);
    expect(toArrayInt(λ.APPEND(λ.EMPTY_LIST)(λ.EMPTY_LIST))).toEqual([]);
  });
  it("can concatenate strings", () => {
    const str1 = "This is a ";
    const str2 = "concatenated string!";
    const expr = λ.APPEND(fromString(str1))(fromString(str2));
    expect(toString(expr)).toBe(str1 + str2);
  });
});

describe("LENGTH", () => {
  it("returns the length of a list", () => {
    const lst = λ.LIST_ELEMENT(λ.ONE)(
      λ.LIST_ELEMENT(λ.TWO)(λ.LIST_ELEMENT(λ.THREE)(λ.EMPTY_LIST))
    );
    const expr = λ.LENGTH(lst);
    expect(toInt(expr)).toBe(3);
  });
  it("returns 0 for an empty list", () => {
    const expr = λ.LENGTH(λ.EMPTY_LIST);
    expect(toInt(expr)).toBe(0);
  });
});

describe("REVERSE", () => {
  it("reverses a list", () => {
    const lst = λ.LIST_ELEMENT(λ.ONE)(
      λ.LIST_ELEMENT(λ.TWO)(λ.LIST_ELEMENT(λ.THREE)(λ.EMPTY_LIST))
    );
    const expr = λ.REVERSE(lst);
    expect(toArrayInt(expr)).toEqual([3, 2, 1]);
  });
  it("returns an empty list when passed an empty list", () => {
    const expr = λ.REVERSE(λ.EMPTY_LIST);
    expect(toArray(expr)).toEqual([]);
  });
});

describe("TAKE", () => {
  it("returns the prefix of a list of a given length", () => {
    const lst = λ.LIST_ELEMENT(λ.ONE)(
      λ.LIST_ELEMENT(λ.TWO)(λ.LIST_ELEMENT(λ.THREE)(λ.EMPTY_LIST))
    );
    const expr = λ.TAKE(λ.TWO)(lst);
    expect(toArrayInt(expr)).toEqual([1, 2]);
  });
  it("returns an empty list when passed an empty list", () => {
    const expr = λ.TAKE(λ.TWO)(λ.EMPTY_LIST);
    expect(toArray(expr)).toEqual([]);
  });
});

describe("DROP", () => {
  it("returns the suffix of a list after dropping the given number of elements", () => {
    const lst = λ.LIST_ELEMENT(λ.ONE)(
      λ.LIST_ELEMENT(λ.TWO)(λ.LIST_ELEMENT(λ.THREE)(λ.EMPTY_LIST))
    );
    const expr = λ.DROP(λ.ONE)(lst);
    expect(toArrayInt(expr)).toEqual([2, 3]);
  });
  it("returns an empty list when passed an empty list", () => {
    const expr = λ.DROP(λ.ONE)(λ.EMPTY_LIST);
    expect(toArray(expr)).toEqual([]);
  });
});

describe("ZIP", () => {
  it("takes two lists and returns a list of corresponding pairs", () => {
    const arr = [
      {
        fst: 1,
        snd: 1,
      },
      {
        fst: 2,
        snd: 2,
      },
      {
        fst: 3,
        snd: 3,
      },
    ];
    const lst = λ.LIST_ELEMENT(λ.ONE)(
      λ.LIST_ELEMENT(λ.TWO)(λ.LIST_ELEMENT(λ.THREE)(λ.EMPTY_LIST))
    );
    const expr = λ.ZIP(lst)(lst);
    expect(toArray(expr).map(toPairInt)).toEqual(arr);
  });
  it("discards excess elements if one of the two lists is longer", () => {
    const arr = [
      {
        fst: 1,
        snd: 1,
      },
      {
        fst: 2,
        snd: 2,
      },
    ];
    const lst1 = λ.LIST_ELEMENT(λ.ONE)(
      λ.LIST_ELEMENT(λ.TWO)(λ.LIST_ELEMENT(λ.THREE)(λ.EMPTY_LIST))
    );
    const lst2 = λ.LIST_ELEMENT(λ.ONE)(λ.LIST_ELEMENT(λ.TWO)(λ.EMPTY_LIST));
    const expr = λ.ZIP(lst1)(lst2);
    expect(toArray(expr).map(toPairInt)).toEqual(arr);
  });
  it("returns an empty list if one of the arguments is an empty list", () => {
    const lst = λ.LIST_ELEMENT(λ.ONE)(
      λ.LIST_ELEMENT(λ.TWO)(λ.LIST_ELEMENT(λ.THREE)(λ.EMPTY_LIST))
    );
    const expr = λ.ZIP(lst)(λ.EMPTY_LIST);
    expect(toArray(expr)).toEqual([]);
  });
});

describe("ZIP_WITH", () => {
  it("zips two lists using a provided zipping function", () => {
    const lst = λ.LIST_ELEMENT(λ.ONE)(
      λ.LIST_ELEMENT(λ.TWO)(λ.LIST_ELEMENT(λ.THREE)(λ.EMPTY_LIST))
    );
    const expr = λ.ZIP_WITH(λ.PLUS)(lst)(lst);
    expect(toArrayInt(expr)).toEqual([2, 4, 6]);
  });
  it("discards excess elements if one of the two lists is longer", () => {
    const lst1 = λ.LIST_ELEMENT(λ.ONE)(
      λ.LIST_ELEMENT(λ.TWO)(λ.LIST_ELEMENT(λ.THREE)(λ.EMPTY_LIST))
    );
    const lst2 = λ.LIST_ELEMENT(λ.ONE)(λ.LIST_ELEMENT(λ.TWO)(λ.EMPTY_LIST));
    const expr = λ.ZIP_WITH(λ.PLUS)(lst1)(lst2);
    expect(toArrayInt(expr)).toEqual([2, 4]);
  });
  it("returns an empty list if one of the arguments is an empty list", () => {
    const lst = λ.LIST_ELEMENT(λ.ONE)(
      λ.LIST_ELEMENT(λ.TWO)(λ.LIST_ELEMENT(λ.THREE)(λ.EMPTY_LIST))
    );
    const expr = λ.ZIP_WITH(λ.PLUS)(lst)(λ.EMPTY_LIST);
    expect(toArray(expr)).toEqual([]);
  });
});

describe("INSERT", () => {
  it("inserts an element into a list, preserving order", () => {
    const lst = λ.LIST_ELEMENT(λ.ONE)(λ.LIST_ELEMENT(λ.THREE)(λ.EMPTY_LIST));
    const expr = λ.INSERT(λ.TWO)(lst);
    expect(toArrayInt(expr)).toEqual([1, 2, 3]);
  });
  it("creates a singleton list if the argument list is empty", () => {
    const expr = λ.INSERT(λ.ONE)(λ.EMPTY_LIST);
    expect(toArrayInt(expr)).toEqual([1]);
  });
});

describe("SORT", () => {
  it("sorts a list", () => {
    const lst = λ.LIST_ELEMENT(λ.THREE)(
      λ.LIST_ELEMENT(λ.ONE)(λ.LIST_ELEMENT(λ.TWO)(λ.EMPTY_LIST))
    );
    const expr = λ.SORT(lst);
    expect(toArrayInt(expr)).toEqual([1, 2, 3]);
  });
  it("returns an empty list when passed an empty list", () => {
    const expr = λ.SORT(λ.EMPTY_LIST);
    expect(toArrayInt(expr)).toEqual([]);
  });
});

describe("REPEAT", () => {
  it("generates an infinite list of identical values", () => {
    const expr = λ.REPEAT(λ.ZERO);
    expect(toArrayInt(λ.TAKE(λ.ONE)(expr))).toEqual([0]);
    expect(toArrayInt(λ.TAKE(λ.TWO)(expr))).toEqual([0, 0]);
    expect(toArrayInt(λ.TAKE(λ.THREE)(expr))).toEqual([0, 0, 0]);
  });
  it("throws an error when directly evaluated", () => {
    const expr = λ.REPEAT(λ.ZERO);
    expect(() => toArrayInt(expr)).toThrowError(RangeError);
  });
});

describe("SUM_FOLD", () => {
  it("returns the sum of the values in a list using a fold (monoidal addition)", () => {
    const lst = λ.LIST_ELEMENT(λ.ONE)(
      λ.LIST_ELEMENT(λ.TWO)(λ.LIST_ELEMENT(λ.THREE)(λ.EMPTY_LIST))
    );
    const expr = λ.SUM_FOLD(lst);
    expect(toInt(expr)).toBe(6);
  });
  it("returns 0 when passed an empty list (identity for addition)", () => {
    const expr = λ.SUM_FOLD(λ.EMPTY_LIST);
    expect(toInt(expr)).toBe(0);
  });
});

describe("PRODUCT_FOLD", () => {
  it("returns the product of the values in a list using a fold (monoidal multiplication)", () => {
    const lst = λ.LIST_ELEMENT(λ.TWO)(
      λ.LIST_ELEMENT(λ.TWO)(λ.LIST_ELEMENT(λ.TWO)(λ.EMPTY_LIST))
    );
    const expr = λ.PRODUCT_FOLD(lst);
    expect(toInt(expr)).toBe(8);
  });
  it("returns 1 when passed an empty list (identity for multiplication)", () => {
    const expr = λ.PRODUCT_FOLD(λ.EMPTY_LIST);
    expect(toInt(expr)).toBe(1);
  });
});

describe("AND_FOLD", () => {
  it("returns the boolean sum of AND-ing the values in a list using a fold (monoidal conjunction)", () => {
    const lst1 = λ.LIST_ELEMENT(λ.TRUE)(
      λ.LIST_ELEMENT(λ.TRUE)(λ.LIST_ELEMENT(λ.TRUE)(λ.EMPTY_LIST))
    );
    const lst2 = λ.LIST_ELEMENT(λ.FALSE)(
      λ.LIST_ELEMENT(λ.TRUE)(λ.LIST_ELEMENT(λ.TRUE)(λ.EMPTY_LIST))
    );
    const expr1 = λ.AND_FOLD(lst1);
    const expr2 = λ.AND_FOLD(lst2);
    expect(toBool(expr1)).toBe(true);
    expect(toBool(expr2)).toBe(false);
  });
  it("returns true when passed an empty list (identity for conjunction)", () => {
    const expr = λ.AND_FOLD(λ.EMPTY_LIST);
    expect(toBool(expr)).toBe(true);
  });
});

describe("OR_FOLD", () => {
  it("returns the boolean sum of OR-ing the values in a list using a fold (monoidal disjunction)", () => {
    const lst1 = λ.LIST_ELEMENT(λ.FALSE)(
      λ.LIST_ELEMENT(λ.TRUE)(λ.LIST_ELEMENT(λ.TRUE)(λ.EMPTY_LIST))
    );
    const lst2 = λ.LIST_ELEMENT(λ.FALSE)(
      λ.LIST_ELEMENT(λ.FALSE)(λ.LIST_ELEMENT(λ.FALSE)(λ.EMPTY_LIST))
    );
    const expr1 = λ.OR_FOLD(lst1);
    const expr2 = λ.OR_FOLD(lst2);
    expect(toBool(expr1)).toBe(true);
    expect(toBool(expr2)).toBe(false);
  });
  it("returns false when passed an empty list (identity for disjunction)", () => {
    const expr = λ.OR_FOLD(λ.EMPTY_LIST);
    expect(toBool(expr)).toBe(false);
  });
});

describe("LENGTH_FOLD", () => {
  it("returns length of a list using a fold", () => {
    const lst = λ.LIST_ELEMENT(λ.ONE)(
      λ.LIST_ELEMENT(λ.TWO)(λ.LIST_ELEMENT(λ.THREE)(λ.EMPTY_LIST))
    );
    const expr = λ.LENGTH_FOLD(lst);
    expect(toInt(expr)).toBe(3);
  });
  it("returns 0 when passed an empty list", () => {
    const expr = λ.LENGTH_FOLD(λ.EMPTY_LIST);
    expect(toInt(expr)).toBe(0);
  });
});

describe("REVERSE_FOLD", () => {
  it("reverses a list using a fold", () => {
    const lst = λ.LIST_ELEMENT(λ.ONE)(
      λ.LIST_ELEMENT(λ.TWO)(λ.LIST_ELEMENT(λ.THREE)(λ.EMPTY_LIST))
    );
    const expr = λ.REVERSE_FOLD(lst);
    expect(toArrayInt(expr)).toEqual([3, 2, 1]);
  });
  it("returns 0 when passed an empty list", () => {
    const expr = λ.REVERSE_FOLD(λ.EMPTY_LIST);
    expect(toArray(expr)).toEqual([]);
  });
});

describe("FOLDL", () => {
  const lst = λ.LIST_ELEMENT(λ.ONE)(
    λ.LIST_ELEMENT(λ.TWO)(λ.LIST_ELEMENT(λ.THREE)(λ.EMPTY_LIST))
  );
  it("reduces a list to a summary value using a left-associative fold (monoidal addition)", () => {
    const expr = λ.FOLDL(λ.PLUS)(λ.ZERO)(lst);
    expect(toInt(expr)).toBe(6);
  });
  it("reduces a list to a summary value using a left-associative fold (composition of list constructor)", () => {
    const f = λ.FLIP(λ.COMPOSE(λ.LIST_ELEMENT)(λ.PLUS(λ.ONE)));
    const expr = λ.FOLDL(f)(λ.EMPTY_LIST)(lst);
    expect(toArrayInt(expr)).toEqual([4, 3, 2]);
  });
});

describe("REVERSE_FOLDL", () => {
  it("reverses a list using a left-associative fold", () => {
    const lst = λ.LIST_ELEMENT(λ.ONE)(
      λ.LIST_ELEMENT(λ.TWO)(λ.LIST_ELEMENT(λ.THREE)(λ.EMPTY_LIST))
    );
    const expr = λ.REVERSE_FOLDL(lst);
    expect(toArrayInt(expr)).toEqual([3, 2, 1]);
  });
  it("returns 0 when passed an empty list", () => {
    const expr = λ.REVERSE_FOLDL(λ.EMPTY_LIST);
    expect(toArray(expr)).toEqual([]);
  });
});

describe("NODE", () => {
  it("constructs a binary tree with a value and two leaf nodes", () => {
    const expr = λ.NODE(λ.ONE)(λ.EMPTY_TREE)(λ.EMPTY_TREE);
    expect(toTreeInt(expr)).toEqual([1, [], []]);
  });
  it("constructs a binary tree of arbitrary depth", () => {
    const expr = λ.NODE(λ.TWO)(λ.NODE(λ.ONE)(λ.EMPTY_TREE)(λ.EMPTY_TREE))(
      λ.NODE(λ.THREE)(λ.EMPTY_TREE)(λ.EMPTY_TREE)
    );
    expect(toTreeInt(expr)).toEqual([2, [1, [], []], [3, [], []]]);
  });
});

describe("VALUE", () => {
  it("returns the value of a node in a binary tree", () => {
    const expr = λ.VALUE(
      λ.NODE(λ.TWO)(λ.NODE(λ.ONE)(λ.EMPTY_TREE)(λ.EMPTY_TREE))(
        λ.NODE(λ.THREE)(λ.EMPTY_TREE)(λ.EMPTY_TREE)
      )
    );
    expect(toInt(expr)).toBe(2);
  });
  it("returns an empty tree if the node is empty", () => {
    const expr = λ.VALUE(λ.EMPTY_TREE);
    expect(toArray(expr)).toEqual([]);
  });
});

describe("LEFT", () => {
  it("returns the left branch of a node in a binary tree", () => {
    const expr = λ.LEFT(
      λ.NODE(λ.TWO)(λ.NODE(λ.ONE)(λ.EMPTY_TREE)(λ.EMPTY_TREE))(
        λ.NODE(λ.THREE)(λ.EMPTY_TREE)(λ.EMPTY_TREE)
      )
    );
    expect(toTreeInt(expr)).toEqual([1, [], []]);
  });
  it("returns an empty tree if the left branch is a leaf node", () => {
    const expr = λ.LEFT(λ.NODE(λ.ONE)(λ.EMPTY_TREE)(λ.EMPTY_TREE));
    expect(toArray(expr)).toEqual([]);
  });
});

describe("RIGHT", () => {
  it("returns the right branch of a node in a binary tree", () => {
    const expr = λ.RIGHT(
      λ.NODE(λ.TWO)(λ.NODE(λ.ONE)(λ.EMPTY_TREE)(λ.EMPTY_TREE))(
        λ.NODE(λ.THREE)(λ.EMPTY_TREE)(λ.EMPTY_TREE)
      )
    );
    expect(toTreeInt(expr)).toEqual([3, [], []]);
  });
  it("returns an empty tree if the right branch is a leaf node", () => {
    const expr = λ.RIGHT(λ.NODE(λ.ONE)(λ.EMPTY_TREE)(λ.EMPTY_TREE));
    expect(toArray(expr)).toEqual([]);
  });
});

describe("FACT", () => {
  it("returns the factorial of the argument", () => {
    expect(toInt(λ.FACT(λ.ZERO))).toBe(1);
    expect(toInt(λ.FACT(λ.ONE))).toBe(1);
    expect(toInt(λ.FACT(λ.TWO))).toBe(2);
    expect(toInt(λ.FACT(λ.THREE))).toBe(6);
    expect(toInt(λ.FACT(λ.SUCC(λ.THREE)))).toBe(24);
    expect(toInt(λ.FACT(λ.SUCC(λ.SUCC(λ.THREE))))).toBe(120);
  });
});

describe("FIB", () => {
  it("returns the nth Fibonacci number given an argument n", () => {
    expect(toInt(λ.FIB(λ.ZERO))).toBe(0);
    expect(toInt(λ.FIB(λ.ONE))).toBe(1);
    expect(toInt(λ.FIB(λ.TWO))).toBe(1);
    expect(toInt(λ.FIB(λ.THREE))).toBe(2);
    expect(toInt(λ.FIB(λ.SUCC(λ.THREE)))).toBe(3);
    expect(toInt(λ.FIB(λ.SUCC(λ.SUCC(λ.THREE))))).toBe(5);
  });
});
