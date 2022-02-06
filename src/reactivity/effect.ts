import { extend } from "../shared";

// 定义一个全局的容器
let activeEffect;

// 执行 run 的时候才能收集依赖
let shouldTrack;

class ReactiveEffect {
  private _fn: any;
  active = true;
  onStop?: () => void;
  public scheduler: Function | undefined;
  deps = [];
  constructor(fn, scheduler?: Function) {
    this._fn = fn;
    this.scheduler = scheduler;
  }
  run() {
    if (!this.active) {
      return this._fn();
    }
    shouldTrack = true;
    activeEffect = this;
    const result = this._fn();
    shouldTrack = false;
    return result;
  }
  stop() {
    // 避免多次调用时清空多次
    if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}

function cleanupEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect);
  });
}

export function isTracking() {
  return shouldTrack && activeEffect !== undefined;
}

const targetMap = new Map();

/**
 * @param target 当前目标
 * @param key 当前目标属性
 */
export function track(target, key) {
  if (!isTracking()) return;

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
  trackEffect(dep);
}

/**
 *
 * @param dep dep用来存放所有的effect
 * @returns
 */
export function trackEffect(dep) {
  if (dep.has(activeEffect)) return; //避免重复收集 activeEffect
  dep.add(activeEffect);
  activeEffect.deps.push(dep);
}

/**
 * @param target 当前目标
 * @param key 当前目标属性
 */
export function trigger(target, key) {
  let depsMap = targetMap.get(target);
  let dep = depsMap.get(key);
  triggerEffect(dep);
}

/**
 *
 * @param dep 用来存放所有的effect的容器
 */
export function triggerEffect(dep) {
  // 执行收集到的所有effect的run方法
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}

/**
 *
 * @param fn
 * @param options
 * @returns
 */
export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler);
  // options
  extend(_effect, options);
  _effect.run();
  const runner: any = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
}

export function stop(runner) {
  runner.effect.stop();
}
