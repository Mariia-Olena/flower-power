import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

import { ProductsService } from '@services/products.service';
import { Plant } from '@productHome/product/types/plant.interface';
import { PlantCard } from '@shop/products-home/components/products/types/plant.interface';
import { PlantInfo } from '@productHome/product-info/types/plant-info.interface';
import { PlantReview } from '@productHome//product-review/types/plant-review.interface';
import { APIproduct, Product } from '@interfaces/product-plant.interface';
import { CartV2Service } from '@sharedModule/services/cart-v2.service';
import { ProductMapper } from '@sharedModule/mappers/product.mapper';
import { ProductsMapper } from '@sharedModule/mappers/products.mapper';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss'],
})
export class ProductHomeComponent implements OnInit {
  product$: Observable<APIproduct>;
  plant$: Observable<Plant>;
  plantInfo$: Observable<PlantInfo>;
  plantReview$: Observable<PlantReview[]>;

  products$: Observable<APIproduct[]>;
  plants$: Observable<PlantCard[]>;

  product: Product;

  limit: number = 9;
  currentPage: number = 1;
  sort: string = '-name';

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartV2Service: CartV2Service,
    private productMapper: ProductMapper,
    private productsMapper: ProductsMapper
  ) {}

  getPlant() {
    this.route.params.subscribe(({ id }) => {
      this.product$ = this.productsService.getProduct(id).pipe(
        tap((value: APIproduct) => {
          this.product = value;
        })
      );
    });

    this.setPlant();
    this.setPlantInfo();
    this.setPlantReview();
  }

  setPlant(): void {
    this.plant$ = this.product$.pipe(
      map((value) => this.productMapper.mapPlant(value))
    );
  }

  // Doesn't work in this way
  // setPlant(): void {
  //   this.plant$ = this.product$.pipe(map(this.productMapper.mapPlant));
  // }

  setPlantInfo(): void {
    this.plantInfo$ = this.product$.pipe(map(this.productMapper.mapPlantInfo));
  }

  setPlantReview(): void {
    this.plantReview$ = this.product$.pipe(
      map(this.productMapper.mapPlantReview)
    );
  }

  addToCart(): void {
    this.cartV2Service.addProduct(this.product);
  }

  setPlants(limit: number, currentPage: number, sort: string) {
    this.products$ = this.productsService.getAllProducts(
      limit,
      currentPage,
      sort
    );

    this.plants$ = this.products$.pipe(
      map((value) => this.productsMapper.mapPlants(value))
    );
  }

  ngOnInit(): void {
    this.getPlant();

    this.setPlants(
      this.limit,
      this.currentPage,
      this.sort
    );
  }
}
