export interface PlantCard {
  name: string;
  img: string;
  price: number;
  id: string;
  count?: () => number;
  isInCart?: () => boolean;
  counterChange?: (count: number) => void;
}
