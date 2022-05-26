import { Client } from "pg";

const { DB_HOST, DB_USER, DB_PORT, DB_PASSWORD, DB_DATABASE } = process.env;

export const client = new Client({
  host: DB_HOST,
  user: DB_USER,
  port: parseInt(DB_PORT!),
  password: DB_PASSWORD,
  database: DB_DATABASE,
});
