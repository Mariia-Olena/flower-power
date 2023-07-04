export interface Plant {
  slides: { img: string }[];
  name: string;
  price: number;
  size: {
    size: string,
    coeff: number
  }[];
  potColor: string[];
  id: string;
  count?: () => number;
  isInCart?: () => boolean;
  counterChange?: (count: number) => void;
}
