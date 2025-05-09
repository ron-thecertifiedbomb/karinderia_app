import { FormLogInData } from "@/interfaces/authenticate";
import { atom } from "jotai";



export const authenticateAtom = atom<FormLogInData | null>();
