import { ShapeFlags } from "../shared/ShapeFlags";

export function initSlots(instance, children) {
  // 判断是否是 slot
  const { vnode } = instance;
  if (vnode.shapeFlag & ShapeFlags.SLOTS_CHILDREN) {
    normalizeObjectSlots(children, instance.slots);
  }
}

function normalizeObjectSlots(children, slots) {
  for (const key in children) {
    const value = children[key];
    if (typeof value === "function") {
      slots[key] = (props) => normalizeSlotValue(value(props));
    }
  }
}

function normalizeSlotValue(value) {
  return Array.isArray(value) ? value : [value];
}
