
import { Menu } from "@/interfaces/menu";
import { atom } from "jotai";

export const isLoadingAtom = atom<boolean>(false)
export const allMenusAtom = atom<Menu[] | null>(null);


