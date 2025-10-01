// Mock in-memory users DB
const users = [];

export async function getUserByEmail(email) {
  console.log(users);
  return users.find((u) => u.email === email);
}

export async function createUser({ firstName, lastName, email, password, address, country }) {
  const user = { id: Date.now(), firstName, lastName, email, password, address, country };
  users.push(user);
  return user;
}
