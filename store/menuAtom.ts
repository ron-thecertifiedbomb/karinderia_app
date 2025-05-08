
import { Menu } from "@/interfaces/menu/menu";
import { atom } from "jotai";

export const allMenusAtom = atom<Menu[] | null>(null);


