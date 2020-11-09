const vm = require("vm");
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

vm.createContext(context);

console.log(`
  Hello, ${process.env.USER}!
  Welcome to the maλc REPL. Type ".malc" to see a list of functions or ".utils" for helpers.
`);

const replServer = repl.start("λ> ");

replServer.context = context;

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
      console.table(Object.entries(lambdas));
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
      console.table(Object.entries(utils));
    }
    this.displayPrompt();
  },
});

replServer.on("exit", () => {
  console.log("Farewell... have a functional day!");
  process.exit();
});

Object.defineProperty(replServer.context, "_", {
  configurable: true,
  get: () => replServer.last,
  set: (value) => {
    replServer.last = value;
    if (!replServer.underscoreAssigned) {
      replServer.underscoreAssigned = true;
      replServer.output.write("Expression assignment to _ now disabled.\n");
    }
  },
});

Object.defineProperty(replServer.context, "_error", {
  configurable: true,
  get: () => replServer.lastError,
  set: (value) => {
    replServer.lastError = value;
    if (!replServer.underscoreErrAssigned) {
      replServer.underscoreErrAssigned = true;
      replServer.output.write(
        "Expression assignment to _error now disabled.\n"
      );
    }
  },
});
