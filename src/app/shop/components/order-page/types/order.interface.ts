export interface Order extends OrderForm {
  products: OrderProducts[];
}

export interface OrderForm {
  name: string;
  phone: string;
  message: string;
}

export interface OrderProducts {
  quantity: number;
  name: string;
  id: string;
}
