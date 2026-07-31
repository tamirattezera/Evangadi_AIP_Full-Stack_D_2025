// ========================================
// USER MANAGER MODULE
// ========================================

// PRIVATE DATA

const users = [];

let nextId = 1;
// CREATE USER

export function createUser(name, email) {
  const user = {
    id: nextId++,

    name,

    email,
  };

  users.push(user);

  return user;
}

// GET ALL USERS

export function getUsers() {
  return users;
}

// FIND USER

export function findUser(id) {
  return users.find((user) => user.id === id);
}

// DELETE USER

export function deleteUser(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return false;
  }

  users.splice(index, 1);

  return true;
}
