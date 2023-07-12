export interface APIorder {
  name: string;
  phone: string;
  message: string;
  products: {
    quantity: number;
    name: string;
    id: string;
  }[];
  createdAt: string;
  updatedAt: string;
  id: string;
}

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
