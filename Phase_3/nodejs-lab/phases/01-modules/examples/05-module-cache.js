import { increment } from "./cache-demo.js";
import { increment as incrementAgain } from "./cache-demo.js";

console.log("First call");
increment();

console.log("Second call");
incrementAgain();

console.log("Second call");
increment();
