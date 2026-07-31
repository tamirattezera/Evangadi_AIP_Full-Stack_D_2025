/* Import Syntax:
import defaultExport, {
  namedOne,
  namedTwo,
  namedThree,
} from "./module.js";
 */

import greet, {
  APP_NAME,
  VERSION,
  showVersion,
} from "./04-multiple-exports.js";

console.log(APP_NAME);

console.log(VERSION);

showVersion();

console.log(greet("Eden"));
