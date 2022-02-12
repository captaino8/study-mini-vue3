import { h } from "../../lib/my-vue.esm.js";
import { Foo } from "./Foo.js";

export const App = {
  name: "App",
  render() {
    return h("div", {}, [
      h("div", {}, "App"),
      h(Foo, {
        onAdd(a, b) {
          console.log("on Add", a, b);
        },
        onAddFoo() {
          console.log("Add Foo");
        },
      }),
    ]);
  },
};
