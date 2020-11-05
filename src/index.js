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

repl.start("λ ").context = context;
