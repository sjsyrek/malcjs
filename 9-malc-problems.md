# 9 Malc Problems

Based on [Ninety-Nine Haskell Problems](https://wiki.haskell.org/H-99:_Ninety-Nine_Haskell_Problems). Try them yourself before you look at the [solutions](https://github.com/sjsyrek/malcjs/blob/master/9-malc-problems.md
).

## Problem 1

Find the last element of a list.

```js
λ> lst = LIST_ELEMENT(ONE)(LIST_ELEMENT(TWO)(LIST_ELEMENT(THREE)(LIST_ELEMENT(FOUR)(EMPTY_LIST))))
λ> toInt(lastElem(lst))
4
λ> str = fromString("xyz")
λ> toChar(lastElem(str))
'z'
```

## Problem 2

Find the last but one element of a list.

```js
λ> lst = LIST_ELEMENT(ONE)(LIST_ELEMENT(TWO)(LIST_ELEMENT(THREE)(LIST_ELEMENT(FOUR)(EMPTY_LIST))))
λ> toInt(penultimate(lst))
3
λ> str = fromString("xyz")
λ> toChar(penultimate(str))
'y'
```

## Problem 3

Find the K'th element of a list. The first element in the list is number 1.

```js
λ> lst = LIST_ELEMENT(ONE)(LIST_ELEMENT(TWO)(LIST_ELEMENT(THREE)(LIST_ELEMENT(FOUR)(EMPTY_LIST))))
λ> toInt(elementAt(lst)(TWO))
2
λ> str = fromString("xyz")
λ> toChar(elementAt(str)(TWO))
'y'
```

## Problem 4

Find the number of elements of a list.

```js
λ> lst = LIST_ELEMENT(ONE)(LIST_ELEMENT(TWO)(LIST_ELEMENT(THREE)(LIST_ELEMENT(FOUR)(EMPTY_LIST))))
λ> toInt(length(lst))
4
λ> str = fromString("xyz")
λ> toInt(length(str))
3
```

## Problem 5

Reverse a list.

```js
λ> lst = LIST_ELEMENT(ONE)(LIST_ELEMENT(TWO)(LIST_ELEMENT(THREE)(LIST_ELEMENT(FOUR)(EMPTY_LIST))))
λ> toArrayInt(reverse(lst))
[ 4, 3, 2, 1 ]
λ> str = fromString("xyz")
λ> toString(reverse(str))
'zyx'
```

## Problem 6

Find out whether a list is a palindrome.

It will probably be too inefficient to work usefully on strings.

```js
λ> lst = LIST_ELEMENT(ONE)(LIST_ELEMENT(TWO)(LIST_ELEMENT(TWO)(LIST_ELEMENT(ONE)(EMPTY_LIST))))
λ> toBool(isPalindrome(lst))
true
λ> lst = LIST_ELEMENT(ONE)(LIST_ELEMENT(TWO)(LIST_ELEMENT(THREE)(LIST_ELEMENT(FOUR)(EMPTY_LIST))))
λ> toBool(isPalindrome(lst))
false
```

## Problem 7

Eliminate consecutive duplicates of list elements.

If a list contains repeated elements they should be replaced with a single copy of the element. The order of the elements should not be changed.

It will probably be too inefficient to work usefully on strings.

```js
λ> lst = fromArrayInt([1,1,1,2,2,3,4,4,5,1])
λ> toArrayInt(compress(lst))
[ 1, 2, 3, 4, 5, 1 ]
```

## Problem 8

Duplicate the elements of a list.

```js
λ> lst = LIST_ELEMENT(ONE)(LIST_ELEMENT(TWO)(LIST_ELEMENT(THREE)(LIST_ELEMENT(FOUR)(EMPTY_LIST))))
λ> toArrayInt(duplicate(lst))
[
  1, 1, 2, 2,
  3, 3, 4, 4
]
```

## Problem 9

Insert an element at a given position into a list.

```js
λ> lst = LIST_ELEMENT(ONE)(LIST_ELEMENT(TWO)(LIST_ELEMENT(THREE)(LIST_ELEMENT(FOUR)(EMPTY_LIST))))
λ> toArrayInt(insertAt(TEN)(lst)(TWO))
[ 1, 10, 2, 3, 4 ]
```
