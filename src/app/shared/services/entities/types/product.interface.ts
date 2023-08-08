export interface ProductAdmin {
  id: string;
  name: string;
  price: number;
  created: string;
}

export interface APIproduct {
  name: string;
  price: number;
  description: string;
  id: string;
  extraInfo: ProductExtraInfo;
  createdAt: string;
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
