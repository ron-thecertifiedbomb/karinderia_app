import { OrderItem } from "@/interfaces/menu/order";
import { atom } from "jotai";



export const orderAtom = atom<OrderItem[]>([]);
