import bcrypt from "bcrypt";
import { client } from "../../database";

export interface User {
  id: string;
  username: string;
  password: string;
}

export const getUserByUsername = async (
  username: string
): Promise<User | undefined> => {
  const { rows: users }: { rows: User[] } = await client.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );
  const [user] = users;
  return user;
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  const { rows: users }: { rows: User[] } = await client.query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );
  const [user] = users;
  return user;
};

export const createUser = async (
  username: string,
  password: string
): Promise<void> => {
  const { BCRYPT_SALT } = process.env;
  const hashedPassword = await bcrypt.hash(password, parseInt(BCRYPT_SALT!));
  await client.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
    username,
    hashedPassword,
  ]);
};