class ReactiveEffect {
  private _fn: any;
  constructor(fn) {
    this._fn = fn;
  }
  run() {
    activeEffect = this;
    return this._fn();
  }
}

const targetMap = new Map();

/**
 * @param target 当前目标
 * @param key 当前目标属性
 */
export function track(target, key) {
  // target -> key -> deps -> activeEffect
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }
  // dep用来存放所有的effect
  dep.add(activeEffect);
}

/**
 * @param target 当前目标
 * @param key 当前目标属性
 */
export function trigger(target, key) {
  let depsMap = targetMap.get(target);
  let dep = depsMap.get(key);
  // 执行收集到的所有effect的run方法
  for (const effect of dep) {
    effect.run();
  }
}

// 定义一个全局的容器
let activeEffect;

/**
 * 
 * @param fn 
 * @returns 
 */
export function effect(fn) {
  const _effect = new ReactiveEffect(fn);
  _effect.run();
  return _effect.run.bind(_effect);
}
