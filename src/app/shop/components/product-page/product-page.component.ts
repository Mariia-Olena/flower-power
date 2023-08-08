import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

import { ProductsService } from '@sharedModule/services/entities/products.service';
import { CartV2Service } from '@sharedModule/services/cart-v2.service';
import { ProductMapper } from '@sharedModule/mappers/product.mapper';
import { ProductsMapper } from '@sharedModule/mappers/products.mapper';
import { Plant } from '@productPage/product/types/plant.interface';
import { PlantCard } from '@productsPage/products/types/plant.interface';
import { PlantInfo } from '@productPage/product-info/types/plant-info.interface';
import { PlantReview } from '@productPage/product-review/types/plant-review.interface';
import { APIproduct } from '@sharedModule/services/entities/types/product.interface';
import { CartProduct } from '@sharedModule/types/cart.interface';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  product$: Observable<APIproduct>;
  plant$: Observable<Plant>;
  plantInfo$: Observable<PlantInfo>;
  plantReview$: Observable<PlantReview[]>;

  products$: Observable<APIproduct[]>;
  plants$: Observable<PlantCard[]>;

  product: APIproduct;

  limit: number = 9;
  currentPage: number = 1;
  sort: string = '-name';
  filter: string = '';

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartV2Service: CartV2Service,
    private productMapper: ProductMapper,
    private productsMapper: ProductsMapper
  ) {}

  getPlant() {
    this.route.params.subscribe(({ id }) => {
      this.product$ = this.productsService.getOne(id).pipe(
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

  setPlants(limit: number, currentPage: number, sort: string, filter: string) {
    this.products$ = this.productsService.getAll(
      limit,
      currentPage,
      sort,
      filter
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
      this.sort,
      this.filter
    );
  }
}
