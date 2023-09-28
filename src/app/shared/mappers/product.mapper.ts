import { Injectable } from '@angular/core';
import { Plant, PlantInfo, ProductReview } from '@sharedModule/services/entities/types/product.interface';
import { APIproduct } from '@sharedModule/services/entities/types/product.interface';
import { CartService } from '@sharedModule/services/cart.service';

@Injectable({
  providedIn: 'root',
})
export class ProductMapper {
  constructor(private cartService: CartService) {}

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
        return !!this.cartService.isInCart(value.id);
      },
      count: () => this.cartService.getCount(value.id) || 1,
      counterChange: (count: number): void => {
        this.cartService.changeCount(value.id, count);
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

  mapPlantReview(value: APIproduct): ProductReview[] {
    return [...value.extraInfo.review];
  }
}
