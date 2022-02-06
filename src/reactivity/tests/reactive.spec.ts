import { isProxy, isReactive, reactive } from "../reactive";

describe("reactive", () => {
  it("happy path", () => {
    const original = { foo: 1 };
    let observed = reactive(original);
    expect(original).not.toBe(observed);
    expect(observed.foo).toBe(1);
    expect(isReactive(observed)).toBe(true);
    expect(isReactive(original)).toBe(false);
  });
});

test("nested reactive", () => {
  const original = {
    nested: {
      foo: 1,
    },
    array: [{ bar: 2 }],
  };
  const observed = reactive(original);
  expect(isReactive(observed.nested)).toBe(true);
  expect(isReactive(observed.array)).toBe(true);
  expect(isReactive(observed.array[0])).toBe(true);
  expect(isProxy(observed)).toBe(true);
});
