import * as malc from "./malc.js";
import * as fizzbuzz from "./fizzbuzz.js";
import * as utils from "./utils.js";

import vm from "vm";
import repl from "repl";

const context = {
  ...malc,
  ...fizzbuzz,
  ...utils,
};

vm.createContext(context);

const replServer = repl.start("λ> ");

replServer.context = context;

replServer.defineCommand("malc", {
  help: "Show built-in lambda functions",
  action(arg) {
    this.clearBufferedCommand();
    if (arg) {
      console.log(
        malc[arg] ? `${arg}: ${malc[arg]}` : `Function ${arg} does not exist`
      );
    } else {
      console.table(Object.entries(malc));
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
