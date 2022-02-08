import { computed } from "../computed";
import { reactive } from "../reactive";

describe("computed", () => {
  it("happy path", () => {
    const value = reactive({ foo: 1 });
    const getter = computed(() => {
      return value.foo;
    });
    expect(getter.value).toBe(1);
  });

  it("should computed lazily", () => {
    const value = reactive({
      foo: 1,
    });
    const getter = jest.fn(() => {
      return value.foo;
    });
    const cValue = computed(getter);
    // lazy
    expect(getter).not.toHaveBeenCalled();

    expect(cValue.value).toBe(1);
    expect(getter).toHaveBeenCalledTimes(1);

    // should not computed again
    cValue.value;
    expect(getter).toHaveBeenCalledTimes(1);

    // should not computed until need
    value.foo = 2;
    expect(getter).toHaveBeenCalledTimes(1);

    // now it should compute
    expect(cValue.value).toBe(2);
    expect(getter).toHaveBeenCalledTimes(2);

    // should not compute
    cValue.value;
    expect(getter).toHaveBeenCalledTimes(2);
  });
});
