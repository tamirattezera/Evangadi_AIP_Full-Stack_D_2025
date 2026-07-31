import {
  createUser,
  getUsers,
  findUser,
  deleteUser,
} from "./02-user-manager.js";

const user1 = createUser("Tamirat", "tamirat@gmail.com");

const user2 = createUser("Alex", "alex@gmail.com");

console.log("ALL USERS:");

console.log(getUsers());

console.log("SEARCH USER:");

console.log(findUser(user1.id));

console.log("DELETE RESULT:");

console.log(deleteUser(user2.id));

console.log("FINAL USERS:");

console.log(getUsers());
