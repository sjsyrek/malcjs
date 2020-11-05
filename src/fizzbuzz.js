import {
  APPEND,
  EMPTY_LIST,
  IF_THEN_ELSE,
  IS_ZERO,
  LIST_ELEMENT,
  MAP,
  MOD,
  MULT,
  PLUS,
  TWO,
  THREE,
  FIVE,
  SIX,
  SEVEN,
  TEN,
} from "./malc";

export const FIFTEEN = PLUS(TEN)(FIVE);

export const TWENTY = PLUS(TEN)(TEN);

export const HUNDRED = MULT(TEN)(TEN);

export const F = MULT(TEN)(SEVEN);

export const I = PLUS(HUNDRED)(FIVE);

export const Z = PLUS(HUNDRED)(PLUS(TWENTY)(TWO));

export const B = PLUS(MULT(TEN)(SIX))(SIX);

export const U = PLUS(HUNDRED)(PLUS(TEN)(SEVEN));

export const FIZZ = LIST_ELEMENT(F)(
  LIST_ELEMENT(I)(LIST_ELEMENT(Z)(LIST_ELEMENT(Z)(EMPTY_LIST)))
);

export const BUZZ = LIST_ELEMENT(B)(
  LIST_ELEMENT(U)(LIST_ELEMENT(Z)(LIST_ELEMENT(Z)(EMPTY_LIST)))
);

export const FIZZBUZZ = APPEND(FIZZ)(BUZZ);

export const FIZZBUZZFUNC = MAP((n) =>
  IF_THEN_ELSE(IS_ZERO(MOD(n)(FIFTEEN)))(FIZZBUZZ)(
    IF_THEN_ELSE(IS_ZERO(MOD(n)(THREE)))(FIZZ)(
      IF_THEN_ELSE(IS_ZERO(MOD(n)(FIVE)))(BUZZ)(n)
    )
  )
);

export const FIZZBUZZFUNC_EXP = ((f) =>
  ((f) =>
    ((x) => f((y) => x(x)(y)))((x) =>
      f((y) => x(x)(y))
    ))((r) => (f) => (z) => (xs) =>
    ((p) => (x) => (y) => p(x)(y))(((p) => p((x) => (y) => x))(xs))(z)((x) =>
      f(
        ((xs) => ((p) => p((x) => (y) => x))(((p) => p((x) => (y) => y))(xs)))(
          xs
        )
      )(
        r(f)(z)(
          ((xs) =>
            ((p) => p((x) => (y) => y))(((p) => p((x) => (y) => y))(xs)))(xs)
        )
      )(x)
    )
  )((x) => (xs) =>
    ((x) => (xs) =>
      ((x) => (y) => (p) => p(x)(y))((x) => (y) => y)(
        ((x) => (y) => (p) => p(x)(y))(x)(xs)
      ))(f(x))(xs)
  )(((x) => (y) => (p) => p(x)(y))((x) => (y) => x)((x) => (y) => x)))((n) =>
  ((p) => (x) => (y) => p(x)(y))(
    ((n) => n((m) => (x) => (y) => y)((x) => (y) => x))(
      ((f) =>
        ((x) => f((y) => x(x)(y)))((x) =>
          f((y) => x(x)(y))
        ))((r) => (n) => (m) =>
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
            ))(m)(n)
        )((x) =>
          r(
            ((n) => (m) =>
              m((n) =>
                n((p) => (z) =>
                  z(((n) => (f) => (x) => f(n(f)(x)))(p((x) => (y) => x)))(
                    p((x) => (y) => x)
                  )
                )((z) => z((f) => (x) => x)((f) => (x) => x))((x) => (y) => y)
              )(n))(n)(m)
          )(m)(x)
        )(n)
      )(n)(
        ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))((f) => (x) =>
          f(f(f(f(f(f(f(f(f(f(x))))))))))
        )((f) => (x) => f(f(f(f(f(x))))))
      )
    )
  )(
    ((x) => (xs) =>
      ((x) => (y) => (p) => p(x)(y))((x) => (y) => y)(
        ((x) => (y) => (p) => p(x)(y))(x)(xs)
      ))(
      ((n) => (m) =>
        m(
          ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(n)
        )((f) => (x) => x))((f) => (x) =>
        f(f(f(f(f(f(f(f(f(f(x))))))))))
      )((f) => (x) => f(f(f(f(f(f(f(x))))))))
    )(
      ((x) => (xs) =>
        ((x) => (y) => (p) => p(x)(y))((x) => (y) => y)(
          ((x) => (y) => (p) => p(x)(y))(x)(xs)
        ))(
        ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(
          ((n) => (m) =>
            m(
              ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(n)
            )((f) => (x) => x))((f) => (x) =>
            f(f(f(f(f(f(f(f(f(f(x))))))))))
          )((f) => (x) => f(f(f(f(f(f(f(f(f(f(x)))))))))))
        )((f) => (x) => f(f(f(f(f(x))))))
      )(
        ((x) => (xs) =>
          ((x) => (y) => (p) => p(x)(y))((x) => (y) => y)(
            ((x) => (y) => (p) => p(x)(y))(x)(xs)
          ))(
          ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(
            ((n) => (m) =>
              m(
                ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(n)
              )((f) => (x) => x))((f) => (x) =>
              f(f(f(f(f(f(f(f(f(f(x))))))))))
            )((f) => (x) => f(f(f(f(f(f(f(f(f(f(x)))))))))))
          )(
            ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(
              ((n) => (m) =>
                m((n) => (f) => (x) => f(n(f)(x)))(n))((f) => (x) =>
                f(f(f(f(f(f(f(f(f(f(x))))))))))
              )((f) => (x) => f(f(f(f(f(f(f(f(f(f(x)))))))))))
            )((f) => (x) => f(f(x)))
          )
        )(
          ((x) => (xs) =>
            ((x) => (y) => (p) => p(x)(y))((x) => (y) => y)(
              ((x) => (y) => (p) => p(x)(y))(x)(xs)
            ))(
            ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(
              ((n) => (m) =>
                m(
                  ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(n)
                )((f) => (x) => x))((f) => (x) =>
                f(f(f(f(f(f(f(f(f(f(x))))))))))
              )((f) => (x) => f(f(f(f(f(f(f(f(f(f(x)))))))))))
            )(
              ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(
                ((n) => (m) =>
                  m((n) => (f) => (x) => f(n(f)(x)))(n))((f) => (x) =>
                  f(f(f(f(f(f(f(f(f(f(x))))))))))
                )((f) => (x) => f(f(f(f(f(f(f(f(f(f(x)))))))))))
              )((f) => (x) => f(f(x)))
            )
          )(
            ((x) => (xs) =>
              ((x) => (y) => (p) => p(x)(y))((x) => (y) => y)(
                ((x) => (y) => (p) => p(x)(y))(x)(xs)
              ))(
              ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(
                ((n) => (m) =>
                  m(
                    ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(n)
                  )((f) => (x) => x))((f) => (x) =>
                  f(f(f(f(f(f(f(f(f(f(x))))))))))
                )((f) => (x) => f(f(f(f(f(f(x)))))))
              )((f) => (x) => f(f(f(f(f(f(x)))))))
            )(
              ((x) => (xs) =>
                ((x) => (y) => (p) => p(x)(y))((x) => (y) => y)(
                  ((x) => (y) => (p) => p(x)(y))(x)(xs)
                ))(U)(
                ((x) => (xs) =>
                  ((x) => (y) => (p) => p(x)(y))((x) => (y) => y)(
                    ((x) => (y) => (p) => p(x)(y))(x)(xs)
                  ))(
                  ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(
                    ((n) => (m) =>
                      m(
                        ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(n)
                      )((f) => (x) => x))((f) => (x) =>
                      f(f(f(f(f(f(f(f(f(f(x))))))))))
                    )((f) => (x) => f(f(f(f(f(f(f(f(f(f(x)))))))))))
                  )(
                    ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(
                      ((n) => (m) =>
                        m((n) => (f) => (x) => f(n(f)(x)))(n))((f) => (x) =>
                        f(f(f(f(f(f(f(f(f(f(x))))))))))
                      )((f) => (x) => f(f(f(f(f(f(f(f(f(f(x)))))))))))
                    )((f) => (x) => f(f(x)))
                  )
                )(
                  ((x) => (xs) =>
                    ((x) => (y) => (p) => p(x)(y))((x) => (y) => y)(
                      ((x) => (y) => (p) => p(x)(y))(x)(xs)
                    ))(
                    ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(
                      ((n) => (m) =>
                        m(
                          ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(
                            n
                          )
                        )((f) => (x) => x))((f) => (x) =>
                        f(f(f(f(f(f(f(f(f(f(x))))))))))
                      )((f) => (x) => f(f(f(f(f(f(f(f(f(f(x)))))))))))
                    )(
                      ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(
                        ((n) => (m) =>
                          m((n) => (f) => (x) => f(n(f)(x)))(n))((f) => (x) =>
                          f(f(f(f(f(f(f(f(f(f(x))))))))))
                        )((f) => (x) => f(f(f(f(f(f(f(f(f(f(x)))))))))))
                      )((f) => (x) => f(f(x)))
                    )
                  )(
                    ((x) => (y) => (p) => p(x)(y))((x) => (y) =>
                      x
                    )((x) => (y) => x)
                  )
                )
              )
            )
          )
        )
      )
    )
  )(
    ((p) => (x) => (y) => p(x)(y))(
      ((n) => n((m) => (x) => (y) => y)((x) => (y) => x))(
        ((f) =>
          ((x) => f((y) => x(x)(y)))((x) =>
            f((y) => x(x)(y))
          ))((r) => (n) => (m) =>
          ((p) => (x) => (y) => p(x)(y))(
            ((n) => (m) =>
              ((n) => n((m) => (x) => (y) => y)((x) => (y) => x))(
                ((n) => (m) =>
                  m((n) =>
                    n((p) => (z) =>
                      z(((n) => (f) => (x) => f(n(f)(x)))(p((x) => (y) => x)))(
                        p((x) => (y) => x)
                      )
                    )((z) => z((f) => (x) => x)((f) => (x) => x))((x) => (y) =>
                      y
                    )
                  )(n))(n)(m)
              ))(m)(n)
          )((x) =>
            r(
              ((n) => (m) =>
                m((n) =>
                  n((p) => (z) =>
                    z(((n) => (f) => (x) => f(n(f)(x)))(p((x) => (y) => x)))(
                      p((x) => (y) => x)
                    )
                  )((z) => z((f) => (x) => x)((f) => (x) => x))((x) => (y) => y)
                )(n))(n)(m)
            )(m)(x)
          )(n)
        )(n)((f) => (x) => f(f(f(x))))
      )
    )(
      ((x) => (xs) =>
        ((x) => (y) => (p) => p(x)(y))((x) => (y) => y)(
          ((x) => (y) => (p) => p(x)(y))(x)(xs)
        ))(
        ((n) => (m) =>
          m(
            ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(n)
          )((f) => (x) => x))((f) => (x) =>
          f(f(f(f(f(f(f(f(f(f(x))))))))))
        )((f) => (x) => f(f(f(f(f(f(f(x))))))))
      )(
        ((x) => (xs) =>
          ((x) => (y) => (p) => p(x)(y))((x) => (y) => y)(
            ((x) => (y) => (p) => p(x)(y))(x)(xs)
          ))(
          ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(
            ((n) => (m) =>
              m(
                ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(n)
              )((f) => (x) => x))((f) => (x) =>
              f(f(f(f(f(f(f(f(f(f(x))))))))))
            )((f) => (x) => f(f(f(f(f(f(f(f(f(f(x)))))))))))
          )((f) => (x) => f(f(f(f(f(x))))))
        )(
          ((x) => (xs) =>
            ((x) => (y) => (p) => p(x)(y))((x) => (y) => y)(
              ((x) => (y) => (p) => p(x)(y))(x)(xs)
            ))(
            ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(
              ((n) => (m) =>
                m(
                  ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(n)
                )((f) => (x) => x))((f) => (x) =>
                f(f(f(f(f(f(f(f(f(f(x))))))))))
              )((f) => (x) => f(f(f(f(f(f(f(f(f(f(x)))))))))))
            )(
              ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(
                ((n) => (m) =>
                  m((n) => (f) => (x) => f(n(f)(x)))(n))((f) => (x) =>
                  f(f(f(f(f(f(f(f(f(f(x))))))))))
                )((f) => (x) => f(f(f(f(f(f(f(f(f(f(x)))))))))))
              )((f) => (x) => f(f(x)))
            )
          )(
            ((x) => (xs) =>
              ((x) => (y) => (p) => p(x)(y))((x) => (y) => y)(
                ((x) => (y) => (p) => p(x)(y))(x)(xs)
              ))(
              ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(
                ((n) => (m) =>
                  m(
                    ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(n)
                  )((f) => (x) => x))((f) => (x) =>
                  f(f(f(f(f(f(f(f(f(f(x))))))))))
                )((f) => (x) => f(f(f(f(f(f(f(f(f(f(x)))))))))))
              )(
                ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(
                  ((n) => (m) =>
                    m((n) => (f) => (x) => f(n(f)(x)))(n))((f) => (x) =>
                    f(f(f(f(f(f(f(f(f(f(x))))))))))
                  )((f) => (x) => f(f(f(f(f(f(f(f(f(f(x)))))))))))
                )((f) => (x) => f(f(x)))
              )
            )(((x) => (y) => (p) => p(x)(y))((x) => (y) => x)((x) => (y) => x))
          )
        )
      )
    )(
      ((p) => (x) => (y) => p(x)(y))(
        ((n) => n((m) => (x) => (y) => y)((x) => (y) => x))(
          ((f) =>
            ((x) => f((y) => x(x)(y)))((x) =>
              f((y) => x(x)(y))
            ))((r) => (n) => (m) =>
            ((p) => (x) => (y) => p(x)(y))(
              ((n) => (m) =>
                ((n) => n((m) => (x) => (y) => y)((x) => (y) => x))(
                  ((n) => (m) =>
                    m((n) =>
                      n((p) => (z) =>
                        z(
                          ((n) => (f) => (x) => f(n(f)(x)))(p((x) => (y) => x))
                        )(p((x) => (y) => x))
                      )((z) =>
                        z((f) => (x) => x)((f) => (x) => x)
                      )((x) => (y) => y)
                    )(n))(n)(m)
                ))(m)(n)
            )((x) =>
              r(
                ((n) => (m) =>
                  m((n) =>
                    n((p) => (z) =>
                      z(((n) => (f) => (x) => f(n(f)(x)))(p((x) => (y) => x)))(
                        p((x) => (y) => x)
                      )
                    )((z) => z((f) => (x) => x)((f) => (x) => x))((x) => (y) =>
                      y
                    )
                  )(n))(n)(m)
              )(m)(x)
            )(n)
          )(n)((f) => (x) => f(f(f(f(f(x))))))
        )
      )(
        ((x) => (xs) =>
          ((x) => (y) => (p) => p(x)(y))((x) => (y) => y)(
            ((x) => (y) => (p) => p(x)(y))(x)(xs)
          ))(
          ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(
            ((n) => (m) =>
              m(
                ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(n)
              )((f) => (x) => x))((f) => (x) =>
              f(f(f(f(f(f(f(f(f(f(x))))))))))
            )((f) => (x) => f(f(f(f(f(f(x)))))))
          )((f) => (x) => f(f(f(f(f(f(x)))))))
        )(
          ((x) => (xs) =>
            ((x) => (y) => (p) => p(x)(y))((x) => (y) => y)(
              ((x) => (y) => (p) => p(x)(y))(x)(xs)
            ))(
            ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(
              ((n) => (m) =>
                m(
                  ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(n)
                )((f) => (x) => x))((f) => (x) =>
                f(f(f(f(f(f(f(f(f(f(x))))))))))
              )((f) => (x) => f(f(f(f(f(f(f(f(f(f(x)))))))))))
            )(
              ((n) => (m) =>
                m((n) => (f) => (x) => f(n(f)(x)))(n))((f) => (x) =>
                f(f(f(f(f(f(f(f(f(f(x))))))))))
              )((f) => (x) => f(f(f(f(f(f(f(x))))))))
            )
          )(
            ((x) => (xs) =>
              ((x) => (y) => (p) => p(x)(y))((x) => (y) => y)(
                ((x) => (y) => (p) => p(x)(y))(x)(xs)
              ))(
              ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(
                ((n) => (m) =>
                  m(
                    ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(n)
                  )((f) => (x) => x))((f) => (x) =>
                  f(f(f(f(f(f(f(f(f(f(x))))))))))
                )((f) => (x) => f(f(f(f(f(f(f(f(f(f(x)))))))))))
              )(
                ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(
                  ((n) => (m) =>
                    m((n) => (f) => (x) => f(n(f)(x)))(n))((f) => (x) =>
                    f(f(f(f(f(f(f(f(f(f(x))))))))))
                  )((f) => (x) => f(f(f(f(f(f(f(f(f(f(x)))))))))))
                )((f) => (x) => f(f(x)))
              )
            )(
              ((x) => (xs) =>
                ((x) => (y) => (p) => p(x)(y))((x) => (y) => y)(
                  ((x) => (y) => (p) => p(x)(y))(x)(xs)
                ))(
                ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(
                  ((n) => (m) =>
                    m(
                      ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(n)
                    )((f) => (x) => x))((f) => (x) =>
                    f(f(f(f(f(f(f(f(f(f(x))))))))))
                  )((f) => (x) => f(f(f(f(f(f(f(f(f(f(x)))))))))))
                )(
                  ((n) => (m) => m((n) => (f) => (x) => f(n(f)(x)))(n))(
                    ((n) => (m) =>
                      m((n) => (f) => (x) => f(n(f)(x)))(n))((f) => (x) =>
                      f(f(f(f(f(f(f(f(f(f(x))))))))))
                    )((f) => (x) => f(f(f(f(f(f(f(f(f(f(x)))))))))))
                  )((f) => (x) => f(f(x)))
                )
              )(
                ((x) => (y) => (p) => p(x)(y))((x) => (y) => x)((x) => (y) => x)
              )
            )
          )
        )
      )(n)
    )
  )
);
