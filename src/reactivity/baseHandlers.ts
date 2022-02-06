import { extend, isObject } from "../shared";
import { track, trigger } from "./effect";
import { reactive, readonly, ReactiveFlags } from "./reactive";

// 只在初始化的时候会调用
const get = createGetter();
const set = createSetter();

const readonlyGetter = createGetter(true);

const shallowReadonlyGetters = createGetter(true, true);

function createGetter(isReadonly = false, isShallow = false) {
  /**
   * @param target 当前对象
   * @param key 访问的当前对象的属性
   * @returns
   */
  return function (target, key) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly;
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly;
    }

    const res = Reflect.get(target, key);

    if (isShallow) {
      return res;
    }

    // 判断 res 是不是 Object
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res);
    }
    // TODO 依赖收集
    if (!isReadonly) {
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

export const shallowReadonlyHandlers = extend(
  {},
  {
    get: shallowReadonlyGetters,
  }
);
