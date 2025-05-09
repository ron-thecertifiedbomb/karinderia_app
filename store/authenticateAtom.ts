import { FormLogInData, User } from "@/interfaces/authenticate";
import { atom } from "jotai";



export const authenticateAtom = atom<FormLogInData | null>();
export const userDataAtom = atom<User | null>(null);