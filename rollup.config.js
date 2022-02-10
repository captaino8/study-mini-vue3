import typescript from "@rollup/plugin-typescript";

export default {
  input: "./src/index.ts",
  output: [
    {
      format: "cjs",
      file: "lib/my-vue.cjs.js",
    },
    {
      format: "es",
      file: "lib/my-vue.esm.js",
    },
  ],
  plugins: [typescript()],
};
