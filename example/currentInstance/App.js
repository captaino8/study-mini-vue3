import { h, getCurrentInstance } from "../../lib/my-vue.esm.js";
import { Foo } from "./Foo.js";

export const App = {
  name: "App",
  render() {
    return h("div", {}, [h("div", {}, "App Instance"), h(Foo)]);
  },
  setup() {
    const instance = getCurrentInstance();
    console.log("App: ", instance);
  },
};
