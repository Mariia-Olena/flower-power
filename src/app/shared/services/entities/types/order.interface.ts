export interface APIorder {
  name: string;
  phone: string;
  message: string;
  products: {
    quantity: number;
    id: string;
    name: string;
  }[];
  extraInfo: ExtraInfo;
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

export interface OrderProducts {
  quantity: number;
  name: string;
  id: string;
}

export interface Order {
  name: string;
  phone: string;
  message: string;
  products: OrderProducts[];
  extraInfo: ExtraInfo;
}

interface ExtraInfo {
  address: {
    country: string;
    region: string;
    city: string;
    address: string;
  };
}

export interface OrderForm {
  name: string;
  phone: string;
  message: string;
  products: OrderProducts[];
  country: string;
  region: string;
  city: string;
  address: string;
}
