export interface APIorder {
  name: string;
  phone: string;
  message: string;
  products: {
    quantity: number;
    id: string;
    name: string;
  }[];
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface OrderAdmin {
  id: string;
  name: string;
  phone: string;
  created: string;
  updated: string;
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

export interface Order extends OrderForm {
  products: OrderProducts[];
}