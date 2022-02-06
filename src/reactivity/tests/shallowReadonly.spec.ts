import { isReadonly, shallowReadonly } from "../reactive";

describe("shallowReadonly", () => {
  test("should not make non-reactive properties reactive", () => {
    const props = shallowReadonly({ bar: { baz: 2 } });
    expect(isReadonly(props)).toBe(true);
    expect(isReadonly(props.bar)).toBe(false);
  });
});
