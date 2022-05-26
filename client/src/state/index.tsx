import { atom } from "jotai";
import Game from "../interfaces/Game";
import User from "../interfaces/User";

export const userState = atom<User | undefined>(undefined);