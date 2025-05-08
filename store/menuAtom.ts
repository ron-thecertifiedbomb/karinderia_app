import { Product } from "@/interfaces/products/products";
import { atom } from "jotai";

export const allMenusAtom = atom<Product[] | null>(null);

export const selectedProductsAtom = atom<Product | null>(null);
// Default to null
