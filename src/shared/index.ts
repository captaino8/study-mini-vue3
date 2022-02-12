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

export const camelize = (str: string) => {
  return str.replace(/-(\w)/, (_, c) => (c ? c.toUpperCase() : ""));
};
export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const toHandlerKey = (str: string) =>
  str ? "on" + capitalize(camelize(str)) : "";
