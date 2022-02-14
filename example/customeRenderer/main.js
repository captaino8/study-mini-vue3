import { createRenderer, h } from "../../lib/my-vue.esm.js";

const App = {
  setup() {
    return {
      x: 100,
      y: 100,
    };
  },
  render() {
    return h("rect", {
      y: this.y,
      x: this.x,
    });
  },
};
console.log(PIXI);

const game = new PIXI.Application({
  width: 500,
  height: 500,
});

document.body.append(game.view);

const renderer = createRenderer({
  createElement(type) {
    if (type === "rect") {
      const rect = new PIXI.Graphics();
      rect.beginFill(0xFF0000);
      rect.drawRect(0, 0, 100, 100);
      rect.endFill();
      return rect;
    }
  },
  patchProp(el, key, value) {
    el[key] = value;
  },
  insert(el, parent) {
    parent.addChild(el);
  },
});

renderer.createApp(App).mount(game.stage);
