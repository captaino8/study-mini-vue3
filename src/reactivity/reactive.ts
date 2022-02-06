import { mutablehandlers, readonlyHandlers } from "./baseHandlers";

export function reactive(raw) {
  return createActiveObject(raw, mutablehandlers);
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandlers);
}

function createActiveObject(raw, basehandlers) {
  // 本质就是 proxy，可以拦截get和set并执行相应方法
  return new Proxy(raw, basehandlers);
}
