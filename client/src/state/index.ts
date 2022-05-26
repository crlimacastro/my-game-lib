import { atom } from "jotai";
import { User } from "../components/Auth";

export const userState = atom<User | undefined>(undefined);