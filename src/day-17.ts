/**
 * SOLUTION
 */
type FirstChar<T> = T extends `${infer H}${string}` ? H : never;

function compose<T1, T2, T3, T4>(
  f1: (a1: T1) => T2,
  f2: (a2: T2) => T3,
  f3: (a3: T3) => T4
) {
  return function f4(a1: T1): T4 {
    return f3(f2(f1(a1)));
  };
}

const upperCase = <T extends string>(x: T) => x.toUpperCase() as Uppercase<T>;
const lowerCase = <T extends string>(x: T) => x.toLowerCase() as Lowercase<T>;
const firstChar = <T extends string>(x: T) => x[0] as FirstChar<T>;
const firstItem = <T extends unknown[]>(x: T) => x[0] as T[0];
const makeTuple = <T>(x: T) => [x];
const makeBox = <T>(value: T) => ({ value });

/**
 * TESTS
 */
import type { Equal, Expect } from "type-testing";

const t0 = compose(upperCase, makeTuple, makeBox)("hello!").value[0];
//    ^?
type t0_actual = typeof t0; // =>
type t0_expected = "HELLO!"; // =>
type t0_test = Expect<Equal<t0_actual, t0_expected>>;

const t1 = compose(makeTuple, firstItem, makeBox)("hello!" as const).value;
type t1_actual = typeof t1; // =>
type t1_expected = "hello!"; // =>
type t1_test = Expect<Equal<t1_actual, t1_expected>>;

const t2 = compose(upperCase, firstChar, lowerCase)("hello!");
type t2_actual = typeof t2; // =>
type t2_expected = "h"; // =>
type t2_test = Expect<Equal<t2_actual, t2_expected>>;
