import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, tap, map, Observable } from 'rxjs';
import { ProductsService } from '@sharedModule/services/entities/products.service';
import { PlantCard } from '@productsPage/products/types/plant.interface';
import { APIproduct } from '@sharedModule/services/entities/types/product.interface';
import { CartV2Service } from '@sharedModule/services/cart-v2.service';
import { ProductsMapper } from '@sharedModule/mappers/products.mapper';

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

  limit: number = 2;
  currentPage: number = 1;
  sort: string = 'name';
  filter: string = '';

  constructor(
    public productsService: ProductsService,
    private cartV2Service: CartV2Service,
    private productsMapper: ProductsMapper
  ) {}

  setPlants(limit: number, currentPage: number, sort: string, filter: string) {
    this.products$ = this.productsService.getAll(
      limit,
      currentPage,
      sort,
      filter
    );

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
    this.currentPage = page;
    this.setPlants(this.limit, this.currentPage, this.sort, this.filter);
  }

  setProduct(id: string) {
    this.productInCart = this.products.filter(
      (product) => product.id === id
    )[0];
  }

  addToCart(id: string) {
    this.setProduct(id);
    this.cartV2Service.addProduct(this.productInCart);
  }

  ngOnInit(): void {
    this.setPlants(this.limit, this.currentPage, this.sort, this.filter);
  }
}
