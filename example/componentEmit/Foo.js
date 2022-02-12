import { h } from "../../lib/my-vue.esm.js";

export const Foo = {
  name: "Foo",
  setup(props, { emit }) {
    const emitAdd = () => {
      console.log("emit add");
      emit("add", 1, 2);
      emit("add-foo");
    };
    return {
      emitAdd,
    };
  },
  render() {
    const btn = h(
      "button",
      {
        onClick: this.emitAdd,
      },
      "Emit Add"
    );
    const foo = h("div", {}, "Foo");
    return h("div", {}, [foo, btn]);
  },
};
