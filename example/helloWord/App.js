import { h } from "../../lib/my-vue.esm.js";

export const App = {
  render() {
    return h(
      "div",
      { id: "root" },
      // "Hi, " + this.msg
      [h("p", { class: "red" }, "Hi"), h("p", { class: "blue" }, "my-vue")]
    );
  },
  setup() {
    return {
      msg: "mini-vue",
    };
  },
};
