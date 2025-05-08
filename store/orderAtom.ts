import { OrderItem } from "@/interfaces/order";
import { atom } from "jotai";



export const orderAtom = atom<OrderItem[]>([]);
