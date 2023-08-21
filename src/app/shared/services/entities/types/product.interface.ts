export interface APIproduct {
  name: string;
  price: number;
  description: string;
  id: string;
  extraInfo: ProductExtraInfo;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  name: string;
  price: number;
  description: string;
  extraInfo: ProductExtraInfo;
}

export interface ProductExtraInfo {
  image: string[];
  size: {
    size: string;
    coeff: number;
  }[];
  potColor: string[];
  rating: number;
  video: string;
  plantCare: ProductCare;
  review: ProductReview[];
}

export interface ProductCare {
  light: {
    title: string;
    text: string;
  };
  watering: {
    title: string;
    text: string;
  };
  care: {
    title: string;
    text: string;
  };
}

export interface ProductReview {
  name: string;
  rating: number;
  comment: string;
  photo: string;
}

export interface ProductAdmin {
  id: string;
  name: string;
  price: number;
  created: string;
}

export interface PlantInfo {
  name: string;
  video: string;
  plantCare: ProductCare;
}

export interface PlantMethods {
  count?: () => number;
  isInCart?: () => boolean;
  counterChange?: (count: number) => void;
}

export interface PlantCard extends PlantMethods {
  name: string;
  img: string;
  price: number;
  id: string;
}

export interface Plant extends PlantMethods {
  slides: { img: string }[];
  name: string;
  price: number;
  size: {
    size: string,
    coeff: number
  }[];
  potColor: string[];
  id: string;
}