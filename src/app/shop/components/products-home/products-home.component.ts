import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
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
  plants$: Observable<PlantCard[]>;

  private product: Product;

  limit: number = 2;
  currentPage: number = 1;
  sort: string = '-price';

  constructor(public productsService: ProductsService, private cartService: CartService) {}

  changePage(page: number): void {
    this.currentPage = page;
    this.fetchPlants();
  }

  fetchPlants() {    
    this.products$ = this.productsService.getAllProducts(
      this.limit,
      this.currentPage,
      this.sort
    );

    this.plants$ = this.products$.pipe(
      map((res: APIproduct[]): PlantCard[] => {
        return res.map((item: APIproduct): PlantCard => {
          return {
            name: item.name,
            img: item.extraInfo.image[0],
            price: item.price,
            id: item.id,
          };
        });
      })
    );
  }

  setProduct(id: string) {
    this.productsService.getProduct(id).pipe(
      tap((value: APIproduct) => {
        this.product = value;
      })
    );
  }

  addToCart(id: string) {
    this.setProduct(id)
    this.cartService.addProduct(this.product);
  }

  ngOnInit(): void {
    this.fetchPlants();
  }
}
