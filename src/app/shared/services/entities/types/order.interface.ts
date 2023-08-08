export interface OrderAdmin {
  id: string;
  name: string;
  phone: string;
  created: string;
}

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
