import { hasChanged, isObject } from "../shared";
import { isTracking, trackEffect, triggerEffect } from "./effect";
import { reactive } from "./reactive";

class RefImpl {
  private _value: any;
  private _rawValue: any;
  dep = new Set();
  constructor(value) {
    this._rawValue = value;
    // 判断 value 是不是对象
    // 如果是对像的话则要用 reactive 包裹下
    this._value = convert(value);
  }
  get value() {
    // 收集依赖
    trackRefValue(this);
    return this._value;
  }
  set value(newValue) {
    // 当新的值不等于旧值时
    // 需要更新
    if (hasChanged(this._rawValue, newValue)) {
      // 更新值
      this._value = convert(newValue);
      this._rawValue = newValue;
      // 触发依赖
      triggerEffect(this.dep);
    }
  }
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffect(ref.dep);
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value;
}

export function ref(raw) {
  return new RefImpl(raw);
}
