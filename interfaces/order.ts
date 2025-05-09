import { Menu } from "./menu";

export interface OrderItem extends Menu {
  quantity: number;
  dateOrdered: string;
}