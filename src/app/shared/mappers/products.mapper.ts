import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { ProductsService } from '@sharedModule/services/products.service';
import { PlantCard } from '@productsHome/products/types/plant.interface';
import { APIproduct } from '@interfaces/product-plant.interface';
import { CartV2Service } from '@sharedModule/services/cart-v2.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsMapper {
  products$: Observable<APIproduct[]>;
  plants$: BehaviorSubject<PlantCard[]> = new BehaviorSubject<PlantCard[]>([]);

  products: APIproduct[] = [];

  constructor(
    private productsService: ProductsService,
    private cartV2Service: CartV2Service
  ) {}

  setPlants(limit: number, currentPage: number, sort: string) {
    this.products$ = this.productsService.getAllProducts(
      limit,
      currentPage,
      sort
    );

    this.products$
      .pipe(
        tap((res: APIproduct[]) => {
          this.products = res;
        }),
        map((res: APIproduct[]): PlantCard[] => {
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
        })
      )
      .subscribe((res: PlantCard[]) => {
        this.plants$.next(res);
      });

    return this.plants$
  }
}
