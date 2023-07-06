import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, filter, tap } from 'rxjs';
import { ProductsService } from '@sharedModule/services/products.service';
import { PlantCard } from '@productsHome/products/types/plant.interface';
import { APIproduct, Product } from '@interfaces/product-plant.interface';
import { CartV2Service } from '@sharedModule/services/cart-v2.service';
import { ProductsMapper } from '@sharedModule/mappers/products.mapper';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.scss'],
})
export class ProductsHomeComponent implements OnInit {
  plants$: BehaviorSubject<PlantCard[]>;

  private productInCart: Product;

  limit: number = 2;
  currentPage: number = 1;
  sort: string = 'name';

  constructor(
    public productsService: ProductsService,
    private cartV2Service: CartV2Service,
    private ProductsMapper: ProductsMapper
  ) {}

  changePage(page: number): void {
    this.currentPage = page;
    this.ProductsMapper.setPlants(this.limit, this.currentPage, this.sort);
  }

  setProduct(id: string) {
    this.productInCart = this.ProductsMapper.products.filter(
      (product) => product.id === id
    )[0];
  }

  addToCart(id: string) {
    this.setProduct(id);
    this.cartV2Service.addProduct(this.productInCart);
  }

  ngOnInit(): void {
    this.plants$ = this.ProductsMapper.setPlants(
      this.limit,
      this.currentPage,
      this.sort
    );
  }
}
