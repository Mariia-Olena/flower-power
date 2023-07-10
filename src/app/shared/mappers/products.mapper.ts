import { Injectable } from '@angular/core';
import { PlantCard } from '@productsHome/products/types/plant.interface';
import { APIproduct } from '@interfaces/product-plant.interface';
import { CartV2Service } from '@sharedModule/services/cart-v2.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsMapper {
  constructor(
    private cartV2Service: CartV2Service
  ) {}

  mapPlants(res: APIproduct[]): PlantCard[] {
    return res.map((item: APIproduct): PlantCard => {
      return {
        name: item.name,
        img: item.extraInfo.image[0],
        price: item.price,
        id: item.id,
        isInCart: (): boolean => {
          return !!this.cartV2Service.isInCart(item.id);
        },
        count: () => this.cartV2Service.getCount(item.id) || 1,
        counterChange: (count: number): void => {
          this.cartV2Service.changeCount(item.id, count);
        },
      };
    });
  }
}
