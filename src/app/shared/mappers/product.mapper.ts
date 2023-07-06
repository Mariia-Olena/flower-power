import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { ProductsService } from '@services/products.service';
import { Plant } from '@productHome/product/types/plant.interface';
import { PlantCard } from '@shop/products-home/components/products/types/plant.interface';
import { PlantInfo } from '@productHome/product-info/types/plant-info.interface';
import { PlantReview } from '@productHome//product-review/types/plant-review.interface';
import { APIproduct, Product } from '@interfaces/product-plant.interface';
import { CartV2Service } from '@sharedModule/services/cart-v2.service';

@Injectable({
  providedIn: 'root',
})
export class ProductMapper {
  plant$: Observable<Plant>;
  plantInfo$: Observable<PlantInfo>;
  plantReview$: Observable<PlantReview[]>;
  product$: Observable<APIproduct>;

  products$: Observable<APIproduct[]>;
  plants$: Observable<PlantCard[]>;

  product: Product;

  constructor(
    private productsService: ProductsService,
    private cartV2Service: CartV2Service
  ) {}

  setPlant(id: string) {
    this.product$ = this.productsService.getProduct(id).pipe(
      tap((value: APIproduct) => {
        this.product = value;
      })
    );

    this.setPlantCard();
    this.setPlantInfo();
    this.setPlantReview();
  }

  setPlantCard() {
    this.plant$ = this.product$.pipe(
      map((value: APIproduct): Plant => {
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
      })
    );

    return this.plant$;
  }

  setPlantInfo() {
    this.plantInfo$ = this.product$.pipe(
      map((value: APIproduct): PlantInfo => {
        return {
          name: value.name,
          video: value.extraInfo.video,
          plantCare: {
            light: value.extraInfo.plantCare.light,
            watering: value.extraInfo.plantCare.watering,
            care: value.extraInfo.plantCare.care,
          },
        };
      })
    );

    return this.plantInfo$;
  }

  setPlantReview() {
    this.plantReview$ = this.product$.pipe(
      map((value: APIproduct): PlantReview[] => {
        return [...value.extraInfo.review];
      })
    );

    return this.plantReview$;
  }
}
