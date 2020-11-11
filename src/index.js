const repl = require("repl");

const malc = require("./malc.js");
const fizzbuzz = require("./fizzbuzz.js");
const utils = require("./utils.js");

const lambdas = {
  ...malc,
  ...fizzbuzz,
};

const context = {
  ...lambdas,
  ...utils,
};

console.log(`
  Hello, ${process.env.USER}!
  Welcome to the maλc REPL. Type ".malc" to see a list of functions or ".utils" for helpers.
`);

const replServer = repl.start("λ> ");

Object.assign(replServer.context, { ...context });

replServer.defineCommand("malc", {
  help: "Show built-in lambda functions",
  action(arg) {
    this.clearBufferedCommand();
    if (arg) {
      console.log(
        lambdas[arg]
          ? `${arg}: ${lambdas[arg]}`
          : `Function ${arg} does not exist`
      );
    } else {
      console.table(lambdas);
    }
    this.displayPrompt();
  },
});

replServer.defineCommand("utils", {
  help:
    "Show built-in utility functions for converting lambdas to and from JavaScript",
  action(arg) {
    this.clearBufferedCommand();
    if (arg) {
      console.log(
        utils[arg] ? `${arg}: ${utils[arg]}` : `Function ${arg} does not exist`
      );
    } else {
      console.table(utils);
    }
    this.displayPrompt();
  },
});

replServer.on("exit", () => {
  console.log("Farewell... have a functional day!");
  process.exit();
});
