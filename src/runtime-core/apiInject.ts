import { getCurrentInstance } from "./component";

/**
 * 存入
 * @param key
 * @param value
 */
export function provide(key, value) {
  const currentInstance: any = getCurrentInstance();

  if (currentInstance) {
    let { provides } = currentInstance;

    const parentProvides =
      currentInstance.parent && currentInstance.parent.provides;

    if (provides === parentProvides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }

    provides[key] = value;
  }
}

/**
 * 取出
 * @param key
 * @returns
 */
export function inject(key) {
  const currentInstance: any = getCurrentInstance();

  if (currentInstance) {
    const parentProvides = currentInstance.parent.provides;

    return parentProvides[key];
  }
}
