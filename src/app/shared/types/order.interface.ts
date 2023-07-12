export interface Order {
  name: string;
  phone: string;
  message: string;
  products: {
    quantity: number;
    name: string;
    id: string;
  }[];
}

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

export interface orderForm {

}
