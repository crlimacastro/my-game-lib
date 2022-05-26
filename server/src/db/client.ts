import { Client } from "pg";
import Env from "../interfaces/Env";

const { DB_HOST, DB_USER, DB_PORT, DB_PASSWORD, DB_DATABASE } =
  process.env as Env;
  
export default new Client({
  host: DB_HOST,
  user: DB_USER,
  port: parseInt(DB_PORT),
  password: DB_PASSWORD,
  database: DB_DATABASE,
});
