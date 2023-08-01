export interface Product {
  id: string;
  name: string;
  price: number;
  created: string;
}

export interface User {
  id: string;
  name: string;
  created: string;
}

export interface UserAPI {
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Order {
  id: string;
  name: string;
  phone: string;
  created: string;
}

export interface OrderAPI {
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

export interface Params {
  limit: number;
  pageIndex: number;
  currentPage: number;
  sortAPI: string;
  filter: string;
  length: number;
}
