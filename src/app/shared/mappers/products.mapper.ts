import { Injectable } from '@angular/core';
import { PlantCard } from '@sharedModule/services/entities/types/product.interface';
import { APIproduct } from '@sharedModule/services/entities/types/product.interface';
import { CartService } from '@sharedModule/services/cart.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsMapper {
  constructor(private cartService: CartService) {}

  mapPlants(res: APIproduct[]): PlantCard[] {
    return res.map((item: APIproduct): PlantCard => {
      return {
        name: item.name,
        img: item.extraInfo.image[0],
        price: item.price,
        id: item.id,
        isInCart: (): boolean => {
          return !!this.cartService.isInCart(item.id);
        },
        count: () => this.cartService.getCount(item.id) || 1,
        counterChange: (count: number): void => {
          this.cartService.changeCount(item.id, count);
        },
      };
    });
  }
}
