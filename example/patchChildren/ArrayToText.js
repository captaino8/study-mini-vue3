import { h, ref } from "../../lib/my-vue.esm.js";

const prevChildren = [h("div", {}, "oldA"), h("div", {}, "oldB")];
const nextChildren = "newChildren";

export default {
  name: "ArrayToText",
  setup() {
    const isChange = ref(false);
    window.isChange = isChange;
    return {
      isChange,
    };
  },
  render() {
    return this.isChange
      ? h("div", {}, nextChildren)
      : h("div", {}, prevChildren);
  },
};
