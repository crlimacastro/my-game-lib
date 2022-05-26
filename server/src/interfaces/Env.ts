export default interface Env extends NodeJS.ProcessEnv {
  SECRET: string;
  PORT: string;
  DB_HOST: string;
  DB_PORT: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  BCRYPT_SALT: string;
  RAWG_API_KEY: string;
}
