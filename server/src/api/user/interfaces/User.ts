export default interface User extends Express.User {
  id: string;
  username: string;
  password: string;
}
