import { atom } from "jotai";
import User from "../interfaces/User";

export const userState = atom<User | undefined>(undefined);
export const lastSearchQueryState = atom<string | undefined>(undefined);