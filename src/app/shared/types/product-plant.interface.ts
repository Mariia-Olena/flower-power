export interface APIproduct {
  name: string;
  price: number;
  description: string;
  extraInfo: any;
}

export interface Product extends APIproduct {
  extraInfo: ProductExtraInfo;
}

export interface ProductExtraInfo {
  image: string[];
  size: number[];
  potType: string[];
  rating: number;
  video: string;
  plantCare: string[];
  review: Review[];
}

export interface Review {
  name: string;
  rating: number;
  comment: string;
  photo: string;
  itemType: string;
}
