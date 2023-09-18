const pkj = require("../package.json");
const esbuild = require("esbuild");
const nodemon = require("nodemon");

/** @type {esbuild.Plugin} */
const nodemonPlugin = {
  name: "nodemon-plugin",
  setup(build) {
    const outfile = build.initialOptions.outfile;
    let started = false;

    if (!outfile) {
      throw new Error("Esbuild outfile option is not defined");
    }

    build.onEnd(() => {
      if (started) {
        console.log(">>> rebuild completed");
        return;
      }

      console.log(">>> build completed");
      started = true;

      nodemon({
        exec: "node " + outfile,
        watch: outfile,
      });
    });
  },
};

const buildScript = pkj.scripts.build;
const [, entryPoint, ...rawOptions] = buildScript.split(" ");

const restEsbuildOptions = rawOptions.reduce((prev, item) => {
  const [initialKey, value] = item.split("=");
  const key = initialKey.replace("--", "");
  prev[key] = value !== undefined ? value : true;
  return prev;
}, {});

/** @type {esbuild.BuildOptions} */
const esbuildOptions = {
  entryPoints: [entryPoint],
  plugins: [nodemonPlugin],
  ...restEsbuildOptions,
};

async function main() {
  const ctx = await esbuild.context(esbuildOptions);
  await ctx.watch();
}

main();
