import { track, trigger } from "./effect";

export function reactive(raw) {
  // 本质就是 proxy，可以拦截get和set并执行相应方法
  return new Proxy(raw, {
    /**
     * @param target 当前对象
     * @param key 访问的当前对象的属性
     * @returns 
     */
    get(target, key) {
      const res = Reflect.get(target, key);
      // TODO 依赖收集
      track(target, key);
      return res;
    },
    /**
     * 
     * @param target 当前对象
     * @param key 当前要更新的对象的属性
     * @param value 要更新的值
     * @returns 
     */
    set(target, key, value) {
      const res = Reflect.set(target, key, value);
      // TODO 触发依赖
      trigger(target, key);
      return res;
    },
  });
}
