export interface Cart {
  items: CartItem[];
}

export interface CartItem {
  name: string;
  size: string;
  img: string;
  price: number;
  quantity: number;
  id: string;
}
