import { h, createTextVNode } from "../../lib/my-vue.esm.js";
import { Foo } from "./Foo.js";

export const App = {
  setup() {},
  render() {
    const app = h("div", {}, "App");
    const foo = h(
      Foo,
      {},
      {
        header: ({ age }) => [
          h("p", {}, "header" + age),
          createTextVNode("你好呀"),
        ],
        footer: () => h("div", {}, "footer"),
      }
    );
    return h("div", {}, [app, foo]);
  },
};
