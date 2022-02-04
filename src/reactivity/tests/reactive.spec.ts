import { reactive } from '../reactive'

describe("reactive", () => {
  it("happy path", () => {
    const original = { foo: 1 };
    let observed = reactive(original);
    expect(original).not.toBe(observed);
    expect(observed.foo).toBe(1);
  });
});
