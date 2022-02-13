import { h, inject, provide } from "../../lib/my-vue.esm.js";

export default {
  name: "ProviderOne",
  setup() {
    provide("foo", "foo");
    provide("bar", "bar");
  },
  render() {
    return h("div", {}, [h("p", {}, "ProviderOne"), h(ProviderTwo)]);
  },
};

const ProviderTwo = {
  name: "ProviderTwo",
  setup() {
    provide("foo", "ProviderTwo");
    const foo = inject("foo");
    return { foo };
  },
  render() {
    return h("div", {}, [
      h("p", {}, "ProviderTwo: " + this.foo),
      h(ProviderThree),
    ]);
  },
};
const ProviderThree = {
  name: "ProviderThree",
  setup() {
    const bar = inject("foo");
    return { bar };
  },
  render() {
    return h("div", {}, "ProviderThree: " + this.bar);
  },
};
