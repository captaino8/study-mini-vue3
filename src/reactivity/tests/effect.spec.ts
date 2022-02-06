import { reactive } from "../reactive";
import { effect, stop } from "../effect";

describe("effect", () => {
  it("happy path", () => {
    const user = reactive({
      age: 10,
    });
    let nextAge;
    effect(() => {
      nextAge = user.age + 1;
    });

    expect(nextAge).toBe(11);

    // update
    user.age++;
    expect(nextAge).toBe(12);
  });
  it("should return runner when call effect", () => {
    let foo = 10;
    const runner = effect(() => {
      foo++;
      return "foo";
    });
    expect(foo).toBe(11);
    const r = runner();
    expect(foo).toBe(12);
    expect(r).toBe("foo");
  });

  it("scheduler", () => {
    // 1. 通过 effect 的第二个参数传递一个 scheduler fn
    // 2. effect 第一次执行的时候 fn 会执行， scheduler 不执行
    // 3. 当响应式对象 set 更新的时候 fn 不执行， scheduler 会执行
    // 4. 再次执行 runner 的时候，fn会再次执行
    let dummy;
    let run;
    const scheduler = jest.fn(() => {
      run = runner;
    });
    const obj = reactive({ foo: 1 });
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      { scheduler }
    );
    expect(scheduler).not.toHaveBeenCalled();
    expect(dummy).toBe(1);
    obj.foo++;
    // should be called on first trigger
    expect(scheduler).toHaveBeenCalledTimes(1);
    // should not run
    expect(dummy).toBe(1);
    // manually run
    run();
    // should have run
    expect(dummy).toBe(2);
  });

  it("stop", () => {
    // 调用 stop 时，响应式对象 set 更新时不会调用 trigger
    let dummy;
    const obj = reactive({ foo: 1 });
    const runner = effect(() => {
      dummy = obj.foo;
    });
    obj.foo = 2;
    expect(dummy).toBe(2);
    stop(runner);
    obj.foo = 3;
    expect(dummy).toBe(2);
    runner();
    expect(dummy).toBe(3);
  });

  it("onStop", () => {
    // 1. 通过 effect 的第二个参数传递一个 onStop fn
    // 2. effect 第一次执行的时候 fn 会执行， scheduler 不执行
    // 3. 当执行 stop 时 onStop 会执行
    let dummy;
    const obj = reactive({ foo: 1 });
    let onStop = jest.fn();
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      {
        onStop,
      }
    );
    stop(runner);
    expect(onStop).toHaveBeenCalledTimes(1);
  });
});
