import { shallowReadonly } from "../reactivity/reactive";
import { emit } from "./componentEmit";
import { PublicInstanceProxyHandlers } from "./componentPublicInstance";
import { initSlots } from "./componentSlot";
import { initProps } from "./componentsProps";

export function createComponentInstance(vnode) {
  const Component = {
    vnode,
    type: vnode.type,
    setupState: {},
    emit: () => {},
    slots: {},
  };
  Component.emit = emit.bind(null, Component) as any;

  return Component;
}

export function setupComponent(instance) {
  // TODO
  initProps(instance, instance.vnode.props);
  initSlots(instance, instance.vnode.children);
  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
  const Component = instance.type;

  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers);
  const { setup } = Component;
  if (setup) {
    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit,
    });
    handleSetupResult(instance, setupResult);
  } else {
    finishComponentSetup(instance);
  }
}
function handleSetupResult(instance, setupResult: any) {
  // function or object
  // TODO function
  if (typeof setupResult === "object") {
    instance.setupState = setupResult;
  }

  finishComponentSetup(instance);
}
function finishComponentSetup(instance: any) {
  const Component = instance.type;
  if (Component.render) {
    instance.render = Component.render;
  }
}
