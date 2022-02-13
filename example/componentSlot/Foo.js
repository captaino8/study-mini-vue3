import { h, renderSlots } from "../../lib/my-vue.esm.js";

export const Foo = {
  setup() {},
  render() {
    console.log(this.$slots);
    const foo = h("div", {}, "Foo");
    return h("div", {}, [
      renderSlots(this.$slots, "header", {
        age: 1,
      }),
      foo,
      renderSlots(this.$slots, "footer"),
    ]);
  },
};
