import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

import { ProductsService } from '@services/products.service';
import { Plant } from '@productHome/product/types/plant.interface';
import { PlantInfo } from '@productHome/product-info/types/plant-info.interface';
import { PlantReview } from '@productHome//product-review/types/plant-review.interface';
import { APIproduct, Product } from '@interfaces/product-plant.interface';
import { CartService } from '@sharedModule/services/cart.service';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss'],
})
export class ProductHomeComponent implements OnInit {
  plant$: Observable<Plant>;
  plantInfo$: Observable<PlantInfo>;
  plantReview$: Observable<PlantReview[]>;
  product$: Observable<APIproduct>;
  private product: Product;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute,
  ) {}

  fetchProduct() {
    this.route.params.subscribe(({ id }) => {
      this.product$ = this.productsService.getProduct(id).pipe(
        tap((value: APIproduct) => {
          this.product = value;
        })
      );
    });

    this.fetchPlant();
    this.fetchPlantInfo();
    this.fetchPlantReview();
  }

  fetchPlant() {
    this.plant$ = this.product$.pipe(
      map((value: APIproduct): Plant => {
        return {
          slides: value.extraInfo.image.map((item: string) => {
            return { img: item };
          }),
          name: value.name,
          price: value.price,
          size: value.extraInfo.size,
          potColor: value.extraInfo.potColor,
          id: value.id,
          isInCart: (): boolean => {
            return !!this.cartService.getProductsInCart()[value.id];
          },
          count: () => this.cartService.getProductsInCart()[value.id]?.count || 1,
          counterChange: (count: number): void => {
            this.cartService.changeCount(value.id, count)
          }
        };
      })
    );
  }

  fetchPlantInfo() {
    this.plantInfo$ = this.product$.pipe(
      map((value: APIproduct): PlantInfo => {
        return {
          name: value.name,
          video: value.extraInfo.video,
          plantCare: {
            light: value.extraInfo.plantCare.light,
            watering: value.extraInfo.plantCare.watering,
            care: value.extraInfo.plantCare.care,
          },
        };
      })
    );
  }

  fetchPlantReview() {
    this.plantReview$ = this.product$.pipe(
      map((value: APIproduct): PlantReview[] => {
        return [...value.extraInfo.review];
      })
    );
  }

  addToCart() {
    this.cartService.addProduct(this.product);
  }

  ngOnInit(): void {
    this.fetchProduct();
  }
}
