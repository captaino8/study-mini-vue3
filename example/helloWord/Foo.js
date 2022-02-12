import { h } from "../../lib/my-vue.esm.js";

export const Foo = {
  setup(props) {
    // props.count
    console.log(props.count);
    props.count++
    console.log(props.count);
  },
  render() {
    return h("div", {}, "foo: " + this.count);
  },
};
