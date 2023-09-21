import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, tap, map, Observable } from 'rxjs';

import { ProductsService } from '@sharedModule/services/entities/products.service';
import { CartService } from '@sharedModule/services/cart.service';
import {
  APIproduct,
  PlantCard,
} from '@sharedModule/services/entities/types/product.interface';
import { ProductsMapper } from '@sharedModule/mappers/products.mapper';
import { ParamsHttp } from '@sharedModule/services/entities/based-crud-http-service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit {
  products$: Observable<APIproduct[]>;
  plants$: BehaviorSubject<PlantCard[]> = new BehaviorSubject<PlantCard[]>([]);

  products: APIproduct[] = [];
  private productInCart: APIproduct;

  params: ParamsHttp = {
    limit: 6,
    page: 1,
    sort: '-name',
    filter: [],
  };

  constructor(
    public productsService: ProductsService,
    private cartService: CartService,
    private productsMapper: ProductsMapper
  ) {}

  setPlants(params: ParamsHttp) {
    this.products$ = this.productsService.getAll(params);

    this.products$
      .pipe(
        tap((res: APIproduct[]) => {
          this.products = res;
        }),
        map((value) => this.productsMapper.mapPlants(value))
      )
      .subscribe((res: PlantCard[]) => {
        this.plants$.next(res);
      });
  }

  changePage(page: number): void {
    this.params.page = page;
    this.setPlants(this.params);
  }

  setProduct(id: string) {
    this.productInCart = this.products.filter(
      (product) => product.id === id
    )[0];
  }

  addToCart(id: string) {
    this.setProduct(id);
    this.cartService.addProduct(this.productInCart);
  }

  ngOnInit(): void {
    this.setPlants(this.params);
  }
}
