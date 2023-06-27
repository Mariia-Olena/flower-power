import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, retry, tap } from 'rxjs';
import { ProductsService } from '@sharedModule/services/products.service';
import { PlantCard } from '@productsHome/products/types/plant.interface';
import { APIproduct, Product } from '@interfaces/product-plant.interface';
import { CartService } from '@sharedModule/services/cart.service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.scss'],
})
export class ProductsHomeComponent implements OnInit {
  products$: Observable<APIproduct[]>;
  plants$: BehaviorSubject<PlantCard[]> = new BehaviorSubject<PlantCard[]>([]);

  private products: APIproduct[];
  private productInCart: Product;

  limit: number = 2;
  currentPage: number = 1;
  sort: string = '-price';

  constructor(
    public productsService: ProductsService,
    private cartService: CartService,
  ) {}

  fetchPlants() {
    this.products$ = this.productsService.getAllProducts(
      this.limit,
      this.currentPage,
      this.sort
    );
    
    this.products$.pipe(
      tap((res: APIproduct[]) => {
        this.products = res;
      }),
      map((res: APIproduct[]): PlantCard[] => {
        return res.map((item: APIproduct): PlantCard => {
          return {
            name: item.name,
            img: item.extraInfo.image[0],
            price: item.price,
            id: item.id
          };
        });
      })
    )
    .subscribe((res: PlantCard[]) => {
      this.plants$.next(res);
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.fetchPlants();
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
    this.fetchPlants();
  }
}
