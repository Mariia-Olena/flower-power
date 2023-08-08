import { Injectable } from '@angular/core';
import { Plant } from '@productPage/product/types/plant.interface';
import { PlantInfo } from '@productPage/product-info/types/plant-info.interface';
import { PlantReview } from '@productPage/product-review/types/plant-review.interface';
import { APIproduct } from '@sharedModule/services/entities/types/product.interface';
import { CartV2Service } from '@sharedModule/services/cart-v2.service';

@Injectable({
  providedIn: 'root',
})
export class ProductMapper {
  constructor(
    private cartV2Service: CartV2Service
  ) {}

  mapPlant(value: APIproduct): Plant {
    return {
      slides: value.extraInfo.image.map((item: string) => {
        return { img: item };
      }),
      name: value.name,
      price: value.price,
      size: value.extraInfo.size,
      potColor: value.extraInfo.potColor,
      id: value.id,
      isInCart: (): boolean => {
        return !!this.cartV2Service.isInCart(value.id);
      },
      count: () => this.cartV2Service.getCount(value.id) || 1,
      counterChange: (count: number): void => {
        this.cartV2Service.changeCount(value.id, count);
      },
    };
  }

  mapPlantInfo(value: APIproduct): PlantInfo {
    return {
      name: value.name,
      video: value.extraInfo.video,
      plantCare: {
        light: value.extraInfo.plantCare.light,
        watering: value.extraInfo.plantCare.watering,
        care: value.extraInfo.plantCare.care,
      },
    };
  }

  mapPlantReview(value: APIproduct): PlantReview[] {
    return [...value.extraInfo.review];
  }
}