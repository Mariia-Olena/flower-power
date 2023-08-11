import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

import { ProductsService } from '@sharedModule/services/entities/products.service';
import { CartService } from '@sharedModule/services/cart.service';
import { ProductMapper } from '@sharedModule/mappers/product.mapper';
import { ProductsMapper } from '@sharedModule/mappers/products.mapper';
import { APIproduct, ProductReview, PlantInfo, PlantCard, Plant } from '@sharedModule/services/entities/types/product.interface';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  product$: Observable<APIproduct>;
  plant$: Observable<Plant>;
  plantInfo$: Observable<PlantInfo>;
  plantReview$: Observable<ProductReview[]>;

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
    private cartService: CartService,
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
    this.cartService.addProduct(this.product);
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

    this.setPlants(this.limit, this.currentPage, this.sort, this.filter);
  }
}
