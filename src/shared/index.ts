export const extend = Object.assign;

export function isObject(val) {
  return val !== null && typeof val === "object";
}

export function hasChanged(value, newValue) {
  return !Object.is(value, newValue);
}

export function hasOwn(value, key) {
  return Object.prototype.hasOwnProperty.call(value, key);
}
