import { h } from "../../lib/my-vue.esm.js";

window.self = null;
export const App = {
  render() {
    self = this;
    return h(
      "div",
      {
        id: "root",
        onClick() {
          console.log("click");
        },
      },
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
