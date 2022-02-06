import { track, trigger } from "./effect";

// 只在初始化的时候会调用
const get = createGetter();
const set = createSetter();

const readonlyGetter = createGetter(true);

function createGetter(readonly = false) {
  /**
   * @param target 当前对象
   * @param key 访问的当前对象的属性
   * @returns
   */
  return function (target, key) {
    const res = Reflect.get(target, key);
    // TODO 依赖收集
    if (!readonly) {
      track(target, key);
    }
    return res;
  };
}

function createSetter() {
  /**
   *
   * @param target 当前对象
   * @param key 当前要更新的对象的属性
   * @param value 要更新的值
   * @returns
   */
  return function (target, key, value) {
    const res = Reflect.set(target, key, value);
    // TODO 触发依赖
    trigger(target, key);
    return res;
  };
}

export const mutablehandlers = {
  get,
  set,
};

export const readonlyHandlers = {
  get: readonlyGetter,
  set(target, key, value) {
    console.warn(`key: ${String(key)} set失败 因为 target 是 readonly`, target);
    // not set
    return true;
  },
};
