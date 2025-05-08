import { atom } from "jotai";

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export const orderAtom = atom<OrderItem[]>([]);
