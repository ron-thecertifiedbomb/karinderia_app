export interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    dateOrdered?: string; // new field
  }