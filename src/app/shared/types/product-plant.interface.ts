export interface APIproduct {
  name: string;
  price: number;
  description: string;
  id: string;
  extraInfo: any;
  createdAt: string;
}

export interface Product extends APIproduct {
  extraInfo: ProductExtraInfo;
}

export interface CartProduct extends Product {
  count: number;
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
  plantCare: {
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
  };
  review: Review[];
}

export interface Review {
  name: string;
  rating: number;
  comment: string;
  photo: string;
}
