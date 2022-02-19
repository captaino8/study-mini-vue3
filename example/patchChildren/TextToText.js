import { h, ref } from "../../lib/my-vue.esm.js";

const preChildren = "oldChildren";
const newChildren = "newChildren";

export default {
  name: "TextToText",
  setup() {
    const isChange = ref(false);
    window.isChange = isChange;
    return {
      isChange,
    };
  },
  render() {
    const self = this;
    return self.isChange
      ? h("div", {}, newChildren)
      : h("div", {}, preChildren);
  },
};
