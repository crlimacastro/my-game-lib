import User from "../interfaces/User";

export const getUserInSession = async (): Promise<User | undefined> => {
  const res = await fetch("http://localhost:8080/user/session", {
    credentials: "include",
  });
  if (res.status === 200) {
    return await res.json();
  }
  return undefined;
};
