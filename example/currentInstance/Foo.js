import { h, getCurrentInstance } from "../../lib/my-vue.esm.js";

export const Foo = {
  name: "Foo",
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    console.log("Foo: ", instance);
  },
  render() {
    const foo = h("div", {}, "Foo instance");
    return h("div", {}, [foo]);
  },
};
