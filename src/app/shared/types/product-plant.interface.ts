export interface APIproduct {
  map(arg0: (item: any) => { name: any; img: any; price: any; id: any; }): import("../../shop/components/products-home/components/products/products.component").Plants;
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
  plantCare: {
    light: string;
    watering: string;
    care: string;
  };
  review: Review[];
}

export interface Review {
  name: string;
  rating: number;
  comment: string;
  photo: string;
}

