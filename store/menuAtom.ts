
import { Menu } from "@/interfaces/menu";
import { atom } from "jotai";




export const isLoadingAtom = atom<boolean>(true)

export const allMenusAtom = atom<Menu[] | null>(null);


